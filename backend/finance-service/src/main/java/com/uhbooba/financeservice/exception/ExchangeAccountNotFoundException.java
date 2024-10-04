package com.uhbooba.financeservice.exception;

public class ExchangeAccountNotFoundException extends RuntimeException {

    public ExchangeAccountNotFoundException() {
        super("환전 계좌를 찾을 수 없습니다.");
    }
}
