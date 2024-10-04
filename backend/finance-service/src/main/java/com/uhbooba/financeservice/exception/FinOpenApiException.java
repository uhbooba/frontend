package com.uhbooba.financeservice.exception;

public class FinOpenApiException extends RuntimeException {

    public FinOpenApiException() {
        super("금융 API 요청 중 에러가 발생했습니다.");
    }

    public FinOpenApiException(String message) {
        super("금융 API 요청 중 에러 발생 : " + message);
    }
}
