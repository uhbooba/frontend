package com.uhbooba.financeservice.dto.finapi.response.exchange;

import lombok.Builder;

@Builder
public record BankCurrencyResponse(
    String currency,
    String currencyName
) {

}
