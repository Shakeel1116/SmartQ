package com.smartq.exception;

@SuppressWarnings("serial")
public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String message) {
        super(message);
    }
}
