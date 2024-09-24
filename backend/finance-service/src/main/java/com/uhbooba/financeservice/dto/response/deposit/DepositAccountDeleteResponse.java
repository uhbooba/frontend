package com.uhbooba.financeservice.dto.response.deposit;

import lombok.Builder;

@Builder
public record DepositAccountDeleteResponse(
    String status,
    String bankCode,
    String bankName,
    String accountNo,
    String accountName,
    String depositBalance,
    String earlyTerminationInterest,
    String earlyTerminationBalance,
    String earlyTerminationDate
) {}
