package com.uhbooba.financeservice.exception;

public class UserAccountNotFoundException extends RuntimeException {

    public UserAccountNotFoundException() {
        super("사용자를 API 에서 찾을 수 없습니다.");
    }
}
