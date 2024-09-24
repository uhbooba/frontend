package com.uhbooba.financeservice.dto.finapi.demand_deposit;

import lombok.Builder;

@Builder
public record DemandDepositCreateRequest(
    String bankCode,
    String accountName,
    String accountDescription
) {}
