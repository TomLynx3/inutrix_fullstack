package com.rtu.iNutrix.security;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;

public class AuthTokenFilter extends OncePerRequestFilter {

    @Autowired
    private Environment _env;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try{
            String token = _parseJwt(request);

            if(token != null){


                GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
                        .setAudience(Collections.singletonList(_env.getProperty("google.clientID")))
                        .build();

                GoogleIdToken googleIdToken = verifier.verify(token);

                if(googleIdToken !=null){
                  UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(googleIdToken,null,new ArrayList<>());

                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            }

        }catch (Exception e){
            logger.error(e.getMessage());
        }
        filterChain.doFilter(request,response);

    }


    private String _parseJwt(HttpServletRequest request){
        String headerAuth = request.getHeader("Authorization");
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7, headerAuth.length());
        }
        return null;
    }
}
