package com.rtu.iNutrix.utilities.errors;

public class ProductErrorCodes {

    public static final String SystemProductNotFound = "P-0";


    public static class SystemProductNotFoundException extends Exception {
        public SystemProductNotFoundException() {super("System product not found");}
    }
}
