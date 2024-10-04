package com.uhbooba.financeservice.exception;

public class DemandDepositAccountAlreadyExistException extends RuntimeException {

    public DemandDepositAccountAlreadyExistException() {
        super("사용자는 이미 수시 입출금 계좌를 보유하고 있습니다.");
    }
}
