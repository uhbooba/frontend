package com.uhbooba.financeservice.dto.finapi.savings;

import lombok.Builder;

@Builder
public record SavingsCreateRequest(
    String bankCode,
    String accountName,
    String accountDescription,
    String subscriptionPeriod,
    String minSubscriptionBalance,
    String maxSubscriptionBalance,
    String interestRate,
    String rateDescription
) {

}
