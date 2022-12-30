package com.rtu.iNutrix.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.rtu.iNutrix.models.DTO.UserDataDTO;
import com.rtu.iNutrix.models.entities.User;
import com.rtu.iNutrix.repositories.UserRepository;
import com.rtu.iNutrix.service.interfaces.AuthService;
import com.rtu.iNutrix.utilities.errors.AuthErrorCodes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Optional;

@Component
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository _userRepo;

    @Autowired
    private Environment _env;

    @Override
    public boolean checkIfUserExist(String id) throws AuthErrorCodes.NoUserInDBException {

        Optional<User> userInDb = _userRepo.findById(id);

        if(userInDb.isEmpty()){
            throw new AuthErrorCodes.NoUserInDBException();
        }

        return true;
    }

    @Override
    public GoogleIdToken verifyGoogleToken(NetHttpTransport transport, GsonFactory factory, String token) throws AuthErrorCodes.InvalidTokenException, GeneralSecurityException, IOException {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, factory)
                .setAudience(Collections.singletonList(_env.getProperty("google.clientID")))
                .build();


        GoogleIdToken googleIdToken = verifier.verify(token);


        if(googleIdToken == null){
            throw new AuthErrorCodes.InvalidTokenException();
        }


        return googleIdToken;
    }


}
