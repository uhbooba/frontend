package com.uhbooba.financeservice.exception;

public class TransferFailedException extends RuntimeException {

    public TransferFailedException() {
        super("이체에 실패했습니다");
    }
}
