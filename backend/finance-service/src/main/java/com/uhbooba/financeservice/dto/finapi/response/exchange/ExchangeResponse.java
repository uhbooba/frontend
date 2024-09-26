package com.uhbooba.financeservice.dto.finapi.response.exchange;

import lombok.Builder;

@Builder
public record ExchangeResponse(
    ExchangeCurrencyDto exchangeCurrency,
    AccountInfoDto accountInfo
) {

}
