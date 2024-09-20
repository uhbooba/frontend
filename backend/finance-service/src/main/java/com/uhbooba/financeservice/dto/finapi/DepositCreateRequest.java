package com.uhbooba.financeservice.dto.finapi;

import lombok.Builder;

@Builder
public record DepositCreateRequest(
    String bankCode,
    String accountName,
    String accountDescription,
    String subscriptionPeriod,
    Long minSubscriptionBalance,
    Long maxSubscriptionBalance,
    String interestRate,
    String rateDescription
) {}
