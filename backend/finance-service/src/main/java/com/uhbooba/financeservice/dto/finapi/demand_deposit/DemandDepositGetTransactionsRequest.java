package com.uhbooba.financeservice.dto.finapi.demand_deposit;

import com.uhbooba.financeservice.entity.TransactionType;
import lombok.Builder;

@Builder
public record DemandDepositGetTransactionsRequest(
    String accountNo,
    String startDate,
    String endDate,
    TransactionType transactionType,
    String orderByType
) {

}
