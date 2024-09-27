package com.uhbooba.financeservice.exception;

public class ForeignCurrencyDemandDepositAccountAlreadyExistException extends RuntimeException {

    public ForeignCurrencyDemandDepositAccountAlreadyExistException() {
        super("사용자는 이미 외화 수시 입출금 계좌를 보유하고 있습니다.");
    }
}
