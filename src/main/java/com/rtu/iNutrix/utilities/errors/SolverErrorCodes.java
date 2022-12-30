package com.rtu.iNutrix.utilities.errors;

public class SolverErrorCodes {

    public final static String SolutionNotFound = "S-1";

    public static class SolutionNotFoundException extends Exception {
        public SolutionNotFoundException() {super("Feasible solution was not found");}
    }
}