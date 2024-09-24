package com.uhbooba.financeservice.dto.response.deposit;

import lombok.Builder;

@Builder
public record DepositResponse(
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
