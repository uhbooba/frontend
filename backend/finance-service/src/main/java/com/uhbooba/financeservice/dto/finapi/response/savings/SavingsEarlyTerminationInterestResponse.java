package com.uhbooba.financeservice.dto.finapi.response.savings;

import lombok.Builder;

@Builder
public record SavingsEarlyTerminationInterestResponse(
    String bankCode,
    String bankName,
    String accountNo,
    String accountName,
    String interestRate,
    String accountCreateDate,
    String earlyTerminationDate,
    String earlyTerminationInterest,
    String earlyTerminationBalance,
    String totalBalance
) {

}
