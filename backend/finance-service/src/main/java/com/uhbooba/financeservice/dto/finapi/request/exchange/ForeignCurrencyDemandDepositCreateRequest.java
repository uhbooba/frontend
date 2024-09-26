package com.uhbooba.financeservice.dto.finapi.request.exchange;

import lombok.Builder;

@Builder
public record ForeignCurrencyDemandDepositCreateRequest(
    String bankCode,
    String accountName,
    String accountDescription
) {}
