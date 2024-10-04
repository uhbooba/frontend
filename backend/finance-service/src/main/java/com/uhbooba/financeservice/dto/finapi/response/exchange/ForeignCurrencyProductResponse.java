package com.uhbooba.financeservice.dto.finapi.response.exchange;

import lombok.Builder;

@Builder
public record ForeignCurrencyProductResponse(
    String accountTypeUniqueNo,
    String bankCode,
    String bankName,
    String accountTypeCode,
    String accountTypeName,
    String accountName,
    String accountDescription,
    String accountType
) {

}
