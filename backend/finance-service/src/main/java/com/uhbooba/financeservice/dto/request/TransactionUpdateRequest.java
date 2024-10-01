package com.uhbooba.financeservice.dto.request;

import com.uhbooba.financeservice.entity.Account;
import lombok.Builder;

@Builder
public record TransactionUpdateRequest(
    String transactionUniqueNo,
    Account account,
    String transactionSummary
) {}
