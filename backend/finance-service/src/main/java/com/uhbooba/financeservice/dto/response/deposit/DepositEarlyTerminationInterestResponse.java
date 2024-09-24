package com.uhbooba.financeservice.dto.response.deposit;

import lombok.Builder;

@Builder
public record DepositEarlyTerminationInterestResponse(
    String bankCode,
    String bankName,
    String accountNo,
    String accountName,
    String interestRate,
    String accountCreateDate,
    String earlyTerminationDate,
    String depositBalance,
    String earlyTerminationInterest,
    String earlyTerminationBalance
) {

}
