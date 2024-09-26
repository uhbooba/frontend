package com.uhbooba.financeservice.dto.finapi.response.demand_deposit;

import lombok.Builder;

@Builder
public record CurrencyDto(
    String currency,
    String currencyName
) {}
