package com.uhbooba.financeservice.dto.finapi.response.demand_deposit;

import lombok.Builder;

// 약간 트랜잭션 느낌
@Builder
public record DemandDepositTransferResponse(
    String transactionUniqueNo,
    String accountNo,
    String transactionDate,
    String transactionType,
    String transactionTypeName,
    String transactionAccountNo
) {

}
