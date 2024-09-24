package com.uhbooba.financeservice.dto.finapi.exchange;

import lombok.Builder;

@Builder
public record ExchangeRequest(
    String accountNo,
    String exchangeCurrency,
    Double exchangeAmount
) {}
