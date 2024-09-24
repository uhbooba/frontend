package com.uhbooba.financeservice.dto.finapi.exchange;

import lombok.Builder;

@Builder
public record ExchangeGetEstimateRequest(
    // 기존 통화
    String fromCurrency,
    // 환전할 통화
    String toCurrency,
    // 금액
    Double amount
) {

}
