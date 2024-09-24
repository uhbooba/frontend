package com.uhbooba.financeservice.dto.response.demand_deposit;

import lombok.Builder;

@Builder
public record DemandDepositAccountBalanceResponse(
    String bankCode,
    String accountNo,
    String accountBalance,
    String accountCreatedDate,
    String accountExpiryDate,
    String lastTransactionDate,
    String currency
) {

}
