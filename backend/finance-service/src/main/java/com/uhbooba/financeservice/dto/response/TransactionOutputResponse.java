package com.uhbooba.financeservice.dto.response;

import com.uhbooba.financeservice.entity.TransactionStatus;
import com.uhbooba.financeservice.entity.TransactionType;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record TransactionOutputResponse(
    Integer id,
    String transactionUniqueNo,
    TransactionStatus status,
    TransactionType type,
    Long transactionBalance,
    Long transactionAfterBalance,
    String transactionSummary,
    LocalDateTime updatedAt
) {}
