package com.rtu.iNutrix.utilities.errors;

public class AuthErrorCodes {

    public static final String InvalidToken = "A-0";
    public static final String NoUserInDB = "A-1";


    public static  class InvalidTokenException extends Exception{
        public InvalidTokenException() {super("Google token is invalid");}
    }

    public static class NoUserInDBException extends Exception {
        public NoUserInDBException() {super("No user in DB");}
    }
}
