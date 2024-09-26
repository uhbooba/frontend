package com.uhbooba.financeservice.entity;


public enum TransactionType {

    M("M", 1), // 입금
    D("D", 2), // 출금
    A("A", 3); // 전체

    private final String requestCode;
    private final int responseCode;

    TransactionType(
        String requestCode,
        int responseCode
    ) {
        this.requestCode = requestCode;
        this.responseCode = responseCode;
    }

    public String getRequestCode() {
        return requestCode;
    }

    public int getResponseCode() {
        return responseCode;
    }

    public static TransactionType fromResponseCode(int responseCode) {
        for(TransactionType type : values()) {
            if(type.getResponseCode() == responseCode) {
                return type;
            }
        }
        throw new IllegalArgumentException(
            "Invalid response code for TransactionType: " + responseCode);
    }
}
