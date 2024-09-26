package com.uhbooba.financeservice.dto.finapi.response.exchange;

import lombok.Builder;

@Builder
public record ForeignCurrencyAccountResponse(
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
