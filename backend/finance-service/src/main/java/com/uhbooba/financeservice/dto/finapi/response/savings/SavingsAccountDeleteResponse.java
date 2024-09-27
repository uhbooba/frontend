package com.uhbooba.financeservice.dto.finapi.response.savings;

import lombok.Builder;

@Builder
public record SavingsAccountDeleteResponse(
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
