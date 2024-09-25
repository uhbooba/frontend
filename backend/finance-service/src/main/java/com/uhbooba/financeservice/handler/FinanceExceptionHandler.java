package com.uhbooba.financeservice.handler;

import com.uhbooba.financeservice.exception.FinOpenApiException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class FinanceExceptionHandler {

    @ExceptionHandler(FinOpenApiException.class)
    public ResponseEntity<String> handleFinOpenApiException(FinOpenApiException e) {
        log.error(e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body(e.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException e) {
        log.error(e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body(e.getMessage());
    }
}
