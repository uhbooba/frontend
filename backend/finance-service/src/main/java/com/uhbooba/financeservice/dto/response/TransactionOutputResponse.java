package com.uhbooba.financeservice.dto.response;

import com.uhbooba.financeservice.entity.Account;
import com.uhbooba.financeservice.entity.TransactionStatus;
import com.uhbooba.financeservice.entity.TransactionType;
import lombok.Builder;

@Builder
public record TransactionOutputResponse(
    Integer id,
    Account account,
    String transactionUniqueNo,
    TransactionStatus status,
    TransactionType type,
    Long transactionBalance,
    String transactionAfterBalance,
    String transactionSummary
) {}
