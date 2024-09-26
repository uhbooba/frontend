package com.uhbooba.financeservice.dto.finapi.response.exchange;

import lombok.Builder;

@Builder
public record ExchangeRateResponse(
    String id,
    String currency,
    String exchangeRate,
    String exchangeMin,
    String created
) {

}
