package com.uhbooba.financeservice.dto.response.demand_deposit;

public record DemandDepositAccountResponse(
    String bankCode,
    String bankName,
    String userName,
    String accountNo,
    String accountName,
    String accountTypeCode,
    String accountTypeName,
    String accountCreatedDate,
    String accountExpiryDate,
    String dailyTransferLimit,
    String oneTimeTransferLimit,
    String accountBalance,
    String lastTransactionDate,
    String currency
) {

}
