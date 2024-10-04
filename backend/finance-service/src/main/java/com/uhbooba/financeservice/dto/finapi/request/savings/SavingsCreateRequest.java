package com.uhbooba.financeservice.dto.finapi.request.savings;

import lombok.Builder;

@Builder
public record SavingsCreateRequest(
    String bankCode,
    String accountName,
    String accountDescription,
    String subscriptionPeriod,
    Long minSubscriptionBalance,
    Long maxSubscriptionBalance,
    Double interestRate,
    String rateDescription
) {

}
