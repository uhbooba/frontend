package com.uhbooba.financeservice.dto.response.demand_deposit;

import lombok.Builder;

@Builder
public record DemandDepositAccountHolderResponse(
    String bankCode,
    String bankName,
    String accountNo,
    String userName,
    String currency
) {

}
