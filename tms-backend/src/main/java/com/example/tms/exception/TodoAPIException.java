package com.example.tms.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class TodoAPIException extends RuntimeException {
    public TodoAPIException(String message) {
        super(message);
    }
}
