package com.uhbooba.financeservice.entity;

public enum TransactionType {
    WITHDRAWAL_TRANSFER, DEPOSIT, EXCHANGE, DEPOSIT_TRANSFER, OTHER;

    public String getKoreanName() {
        return switch(this) {
            case WITHDRAWAL_TRANSFER -> "출금";
            case DEPOSIT -> "입금";
            case EXCHANGE -> "환전";
            case DEPOSIT_TRANSFER -> "입금";
            case OTHER -> "기타";
            default -> "알 수 없음";
        };
    }
}
