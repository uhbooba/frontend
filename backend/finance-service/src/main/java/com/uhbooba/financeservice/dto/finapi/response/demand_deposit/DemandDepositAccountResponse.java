package com.uhbooba.financeservice.dto.finapi.response.demand_deposit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;

@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public record DemandDepositAccountResponse(
    String bankCode,
    String bankName,
    String username,
    String accountNo,
    String accountName,
    String accountTypeCode,
    String accountTypeName,
    String accountBalance,
    String currency
) {}
