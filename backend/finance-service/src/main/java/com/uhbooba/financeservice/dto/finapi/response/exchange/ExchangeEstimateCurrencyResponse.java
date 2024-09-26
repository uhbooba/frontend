package com.uhbooba.financeservice.dto.finapi.response.exchange;

import lombok.Builder;

@Builder
public record ExchangeEstimateCurrencyResponse(
    String amount,
    String currency,
    String currencyName
) {}
