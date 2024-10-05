package com.uhbooba.financeservice.dto.request;

import com.uhbooba.financeservice.entity.Account;
import com.uhbooba.financeservice.entity.TransactionStatus;
import com.uhbooba.financeservice.entity.TransactionType;
import lombok.Builder;

@Builder
public record TransactionCreateRequest(
    Account account,
    String transactionUniqueNo,
    TransactionStatus status,
    TransactionType type,
    Long transactionBalance,
    Long transactionAfterBalance,
    String transactionSummary
) {

}
