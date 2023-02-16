package com.spotify.project.exceptions.enums;

public enum BusinessLogicError {
    FAILED(0," ");

    private final int code;
    private final String description;
    BusinessLogicError(int code, String description) {
        this.code = code;
        this.description = description;
    }

    public int getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }
    @Override
    public String toString() {
        return code + " " + description;
    }
}
