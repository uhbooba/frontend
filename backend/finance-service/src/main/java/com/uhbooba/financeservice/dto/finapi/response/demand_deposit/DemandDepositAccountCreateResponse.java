package com.uhbooba.financeservice.dto.finapi.response.demand_deposit;

import lombok.Builder;

@Builder
public record DemandDepositAccountCreateResponse(
    String bankCode,
    String accountNo,
    CurrencyDto currency
) {

}
