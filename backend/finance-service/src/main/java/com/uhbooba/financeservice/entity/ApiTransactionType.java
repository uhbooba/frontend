package com.uhbooba.financeservice.entity;


public enum ApiTransactionType {

    M("M", 1), // 입금
    D("D", 2), // 출금
    A("A", 3); // 전체

    private final String requestCode;
    private final int responseCode;

    ApiTransactionType(
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

    public static ApiTransactionType fromResponseCode(int responseCode) {
        for(ApiTransactionType type : values()) {
            if(type.getResponseCode() == responseCode) {
                return type;
            }
        }
        throw new IllegalArgumentException(
            "Invalid response code for ApiTransactionType: " + responseCode);
    }
}
