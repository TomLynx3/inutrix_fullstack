package com.rtu.iNutrix.service.interfaces;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.rtu.iNutrix.models.DTO.UserDataDTO;
import com.rtu.iNutrix.utilities.errors.AuthErrorCodes;
import org.aspectj.apache.bcel.generic.FieldGenOrMethodGen;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.security.GeneralSecurityException;

public interface AuthService  {


    boolean checkIfUserExist(String id) throws AuthErrorCodes.NoUserInDBException;
    GoogleIdToken verifyGoogleToken(NetHttpTransport transport,  GsonFactory factory, String token) throws AuthErrorCodes.InvalidTokenException, GeneralSecurityException, IOException;

}
