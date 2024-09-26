package com.uhbooba.financeservice.dto.finapi.response.exchange;

import lombok.Builder;

@Builder
public record ExchangeCurrencyDto(
    String amount,
    String exchangeRate,
    String currency,
    String currencyName
) {

}
