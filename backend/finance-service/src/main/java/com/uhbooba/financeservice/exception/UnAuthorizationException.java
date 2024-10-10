package com.uhbooba.financeservice.exception;

public class UnAuthorizationException extends RuntimeException {

    public UnAuthorizationException() {
        super("비밀번호가 맞지 않습니다.");
    }
}
