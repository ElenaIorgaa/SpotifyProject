package com.spotify.project.exceptions;

import com.spotify.project.exceptions.enums.BusinessLogicError;

public class BusinessLogicException extends Exception{
    private final int code;
    public BusinessLogicException(BusinessLogicError error)
    {
        super(error.getDescription());
        this.code = error.getCode();
    }
    public int getCode()
    {
        return this.code;
    }
}
