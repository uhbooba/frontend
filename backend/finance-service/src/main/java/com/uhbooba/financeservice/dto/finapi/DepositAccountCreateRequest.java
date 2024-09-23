package com.uhbooba.financeservice.dto.finapi;

import lombok.Builder;

@Builder
public record DepositAccountCreateRequest(
    String withdrawalAccountNo,
    String accountTypeUniqueNo,
    Long depositBalance
) {}
