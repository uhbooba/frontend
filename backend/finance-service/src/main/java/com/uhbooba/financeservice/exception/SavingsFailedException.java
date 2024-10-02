package com.uhbooba.financeservice.exception;

public class SavingsFailedException extends RuntimeException {

    public SavingsFailedException() {
        super("적금 가입에 실패했습니다.");
    }

    public SavingsFailedException(String message) {
        super(message);
    }
}
