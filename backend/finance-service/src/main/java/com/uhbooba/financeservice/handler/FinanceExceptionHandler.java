package com.uhbooba.financeservice.handler;

import com.uhbooba.financeservice.dto.CommonResponse;
import com.uhbooba.financeservice.exception.FinOpenApiException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class FinanceExceptionHandler {

    @ExceptionHandler(FinOpenApiException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CommonResponse<?> handleFinOpenApiException(FinOpenApiException e) {
        log.error(e.getMessage(), e);
        return CommonResponse.badRequest(e.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CommonResponse<?> handleRuntimeException(RuntimeException e) {
        log.error(e.getMessage(), e);
        return CommonResponse.badRequest(e.getMessage());
    }
}
