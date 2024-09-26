package com.uhbooba.financeservice.dto.finapi.response.exchange;

import lombok.Builder;

@Builder
public record ForeignCurrencyAccountCreateResponse(
    String bankCode,
    String accountNo,
    BankCurrencyResponse currency
) {

}
