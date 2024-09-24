package com.uhbooba.financeservice.entity;

public enum AccountType {
    DEMAND_DEPOSIT(1),  // 수시입출금
    FIXED_DEPOSIT(2),   // 정기예금
    INSTALLMENT_SAVING(3),  // 정기적금
    LOAN(4);  // 대출

    private final int code;

    AccountType(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static AccountType fromCode(int code) {
        for(AccountType type : AccountType.values()) {
            if(type.getCode() == code) {
                return type;
            }
        }
        throw new IllegalArgumentException("Invalid account type code: " + code);
    }
}
