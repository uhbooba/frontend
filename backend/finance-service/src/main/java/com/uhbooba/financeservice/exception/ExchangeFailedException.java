package com.uhbooba.financeservice.exception;

public class ExchangeFailedException extends RuntimeException {

    public ExchangeFailedException() {
        super("환전에 실패했습니다.");
    }

    public ExchangeFailedException(String message) {
        super(message);
    }
}
