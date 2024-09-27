package com.uhbooba.financeservice.dto.finapi.response.savings;

import lombok.Builder;

@Builder
public record SavingsResponse(
    String accountTypeUniqueNo,
    String bankCode,
    String bankName,
    String accountTypeCode,
    String accountTypeName,
    String accountName,
    String accountDescription,
    String subscriptionPeriod,
    String minSubscriptionBalance,
    String maxSubscriptionBalance,
    String interestRate,
    String rateDescription
) {

}
