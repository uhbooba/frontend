package com.uhbooba.financeservice.dto.finapi.response.demand_deposit;

import lombok.Builder;

@Builder
public record DemandDepositDepositResponse(
    String transactionUniqueNo,
    String transactionDate
) {}
