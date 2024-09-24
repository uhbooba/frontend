package com.uhbooba.financeservice.dto.response.deposit;

public record DepositExpiryInterestResponse(
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
