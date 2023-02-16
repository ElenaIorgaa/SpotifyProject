package com.spotify.project.controllers;

import com.spotify.project.exceptions.request.*;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ExceptionResponse> resourceNotFound(ResourceNotFoundException ex) {
        ExceptionResponse response = new ExceptionResponse();
        response.setErrorCode("NOT_FOUND");
        response.setStatus(404);
        response.setTimestamp(LocalDateTime.now());
        response.setMessage(ex.getMessage());

        return new ResponseEntity<ExceptionResponse>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ResourceAlreadyExists.class)
    public ResponseEntity<ExceptionResponse> resourceAlreadyExists(ResourceAlreadyExists ex) {
        ExceptionResponse response = new ExceptionResponse();
        response.setErrorCode("CONFLICT");
        response.setStatus(409);
        response.setTimestamp(LocalDateTime.now());
        response.setMessage(ex.getMessage());

        return new ResponseEntity<ExceptionResponse>(response, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ExceptionResponse> unauthorizedException(UnauthorizedException ex) {
        ExceptionResponse response = new ExceptionResponse();
        response.setErrorCode("UNAUTHORIZED");
        response.setStatus(401);
        response.setTimestamp(LocalDateTime.now());
        response.setMessage(ex.getMessage());

        return new ResponseEntity<ExceptionResponse>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ExceptionResponse> badRequestExceptionResponse(BadRequestException ex) {
        ExceptionResponse response = new ExceptionResponse();
        response.setErrorCode("BAD REQUEST");
        response.setStatus(400);
        response.setTimestamp(LocalDateTime.now());
        response.setMessage(ex.getMessage());

        return new ResponseEntity<ExceptionResponse>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotAcceptableException.class)
    @Operation(summary = "The exception that is thrown when the request body is not acceptable for example.")
    public ResponseEntity<ExceptionResponse> notAcceptableException(NotAcceptableException exception) {
        ExceptionResponse response = new ExceptionResponse();
        response.setErrorCode("NOT ACCEPTABLE");
        response.setStatus(406);
        response.setTimestamp(LocalDateTime.now());
        response.setMessage(exception.getMessage());

        return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
    }
}
