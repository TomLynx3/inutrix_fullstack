package com.rtu.iNutrix.controller;


import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.rtu.iNutrix.models.BaseResponse;
import com.rtu.iNutrix.models.DTO.CreateUserRq;
import com.rtu.iNutrix.models.DTO.SignInReq;
import com.rtu.iNutrix.service.interfaces.AuthService;
import com.rtu.iNutrix.service.interfaces.UserService;
import com.rtu.iNutrix.utilities.errors.ApiErrorBuilder;
import com.rtu.iNutrix.utilities.errors.AuthErrorCodes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")

public class AuthController {

    Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthService _authService;

    @Autowired
    private UserService _userService;


    @ExceptionHandler(Exception.class)
    public BaseResponse handleException(HttpServletRequest req, Exception ex){

        BaseResponse res = new BaseResponse();

        if(ex instanceof AuthErrorCodes.InvalidTokenException){
            ApiErrorBuilder.buildError(res,AuthErrorCodes.InvalidToken,ex.getLocalizedMessage());
        }else if(ex instanceof  AuthErrorCodes.NoUserInDBException){
            ApiErrorBuilder.buildError(res,AuthErrorCodes.NoUserInDB,ex.getLocalizedMessage());
        }

        logger.error(ex.getLocalizedMessage());

        return res;
    }

    @PostMapping("")
    public BaseResponse signIn( @Autowired NetHttpTransport transport,@Autowired GsonFactory factory, @RequestBody @Valid SignInReq req) throws GeneralSecurityException, IOException, AuthErrorCodes.InvalidTokenException, AuthErrorCodes.NoUserInDBException {
        BaseResponse res = new BaseResponse();

        GoogleIdToken googleIdToken = _authService.verifyGoogleToken(transport,factory,req.getToken());

         _authService.checkIfUserExist(googleIdToken.getPayload().getUserId());

        res.setSuccess(true);
        res.setResult(req.getToken());

        return res;
    }

    @PostMapping("/save-user")
    public BaseResponse saveUser(@Autowired NetHttpTransport transport,@Autowired GsonFactory factory, @RequestBody @Valid CreateUserRq req) throws AuthErrorCodes.InvalidTokenException, GeneralSecurityException, IOException {

        BaseResponse res = new BaseResponse();

        GoogleIdToken googleIdToken = _authService.verifyGoogleToken(transport,factory,req.getToken());


        _userService.saveUserData(req.getUserData(),googleIdToken.getPayload().getUserId());

        res.setSuccess(true);
        res.setResult(req.getToken());

        return res;

    }


}
