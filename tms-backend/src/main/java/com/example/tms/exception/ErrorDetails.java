package com.example.tms.exception;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@RequiredArgsConstructor
public class ErrorDetails {
    private final LocalDateTime timestamp;
    private final String message;
    private final String details;
}
