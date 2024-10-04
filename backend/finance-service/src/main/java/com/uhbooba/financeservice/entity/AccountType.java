package com.uhbooba.financeservice.entity;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public enum AccountType {
    DEMAND_DEPOSIT("1"),  // 수시입출금
    FIXED_DEPOSIT("2"),   // 정기예금
    INSTALLMENT_SAVING("3"),  // 정기적금
    FOREIGN_DEMAND_DEPOSIT("4");  // 외화 수시입출금

    private final String code;

    AccountType(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public static AccountType fromCode(String code) {
        log.info("이거 받음: " + code);
        for(AccountType type : AccountType.values()) {
            if(type.getCode()
                   .equals(code)) {
                return type;
            }
        }
        // 디버그 로그 추가
        log.info("Invalid account type code received: " + code);
        throw new IllegalArgumentException("Invalid account type code: " + code);
    }
}
