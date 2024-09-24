package com.uhbooba.financeservice.dto.finapi.demand_deposit;

import lombok.Builder;

@Builder
public record DemandDepositDepositAccountRequest(
    String accountNo,
    Long transactionBalance,
    String transactionSummary
) {}
