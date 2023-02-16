package com.spotify.project.controllers;

import com.spotify.project.exceptions.requests.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
@Tag(name = "global_exceptions_for_controllers")
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    @Operation(summary = "The exception that is thrown when the resource is not found with its status code.")
    public ResponseEntity<ExceptionResponse> resourceNotFound(ResourceNotFoundException ex) {
        ExceptionResponse response = new ExceptionResponse();
        response.setErrorCode("NOT_FOUND");
        response.setStatus(404);
        response.setTimestamp(LocalDateTime.now());
        response.setMessage(ex.getMessage());

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ResourceAlreadyExists.class)
    @Operation(summary = "The exception that is thrown when the resource already exists with its status code.")
    public ResponseEntity<ExceptionResponse> resourceAlreadyExists(ResourceAlreadyExists ex) {
        ExceptionResponse response = new ExceptionResponse();
        response.setErrorCode("CONFLICT");
        response.setStatus(409);
        response.setTimestamp(LocalDateTime.now());
        response.setMessage(ex.getMessage());

        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UnauthorizedException.class)
    @Operation(summary = "The exception that is thrown when the user is not authorized to make a request.")
    public ResponseEntity<ExceptionResponse> unauthorizedException(UnauthorizedException ex) {
        ExceptionResponse response = new ExceptionResponse();
        response.setErrorCode("UNAUTHORIZED");
        response.setStatus(401);
        response.setTimestamp(LocalDateTime.now());
        response.setMessage(ex.getMessage());

        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(BadRequestException.class)
    @Operation(summary = "The exception that is thrown when there is a bad request made.")
    public ResponseEntity<ExceptionResponse> badRequestExceptionResponse(BadRequestException exception) {
        ExceptionResponse response = new ExceptionResponse();
        response.setErrorCode("BAD REQUEST");
        response.setStatus(400);
        response.setTimestamp(LocalDateTime.now());
        response.setMessage(exception.getMessage());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
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
