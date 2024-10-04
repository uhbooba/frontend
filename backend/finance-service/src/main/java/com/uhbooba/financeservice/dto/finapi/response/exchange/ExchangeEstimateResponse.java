package com.uhbooba.financeservice.dto.finapi.response.exchange;

import lombok.Builder;

@Builder
public record ExchangeEstimateResponse(
    ExchangeEstimateCurrencyResponse currency,
    ExchangeEstimateCurrencyResponse exchangeCurrency
) {

}
