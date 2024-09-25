package com.uhbooba.financeservice.dto.finapi;

import lombok.Builder;

@Builder
public record ExchangeRequest(
    String accountNo,
    String exchangeCurrency,
    Double exchangeAmount
) {}
