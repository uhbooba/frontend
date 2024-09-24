package com.uhbooba.financeservice.dto.finapi.demand_deposit;

import lombok.Builder;

@Builder
public record DemandDepositGetTransactionRequest(
    String accountNo,
    Long transactionUniqueNo
) {

}
