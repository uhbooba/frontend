package com.uhbooba.financeservice.dto.finapi.response.deposit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;

@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public record DepositAccountResponse(
    String bankCode,
    String bankName,
    String accountNo,
    String accountName,
    String withdrawalBankCode,
    String withdrawalAccountNo,
    String subscriptionPeriod,
    String depositBalance,
    String interestRate,
    String accountCreateDate,
    String accountExpiryDate
) {

}
