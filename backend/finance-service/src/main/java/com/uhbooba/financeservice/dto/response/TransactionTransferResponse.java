package com.uhbooba.financeservice.dto.response;

import com.uhbooba.financeservice.entity.Transaction;
import lombok.Builder;

@Builder
public record TransactionTransferResponse(
    Transaction receiverTransaction,
    Transaction senderTransaction
) {}
