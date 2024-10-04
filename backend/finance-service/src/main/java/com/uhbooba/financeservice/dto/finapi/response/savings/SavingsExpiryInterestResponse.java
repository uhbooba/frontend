package com.uhbooba.financeservice.dto.finapi.response.savings;

public record SavingsExpiryInterestResponse(
    String bankCode,
    String bankName,
    String accountNo,
    String accountName,
    String interestRate,
    String accountCreateDate,
    String accountExpiryDate,
    String expiryBalance,
    String expiryInterest,
    String expiryTotalBalance
) {}
