package com.uhbooba.financeservice.exception;

public class DepositFailedException extends RuntimeException {

    public DepositFailedException() {
        super("입금이 실패했습니다.");
    }

    public DepositFailedException(String message) {
        super(message);
    }
}
