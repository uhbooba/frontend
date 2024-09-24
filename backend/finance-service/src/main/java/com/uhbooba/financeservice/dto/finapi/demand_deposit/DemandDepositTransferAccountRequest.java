package com.uhbooba.financeservice.dto.finapi.demand_deposit;

import lombok.Builder;

@Builder
public record DemandDepositTransferAccountRequest(
    String depositAccountNo,
    String depositTransactionSummary,
    Long transactionBalance,
    String withdrawalAccountNo,
    String withdrawalTransactionSummary
) {
    
}
