package com.uhbooba.financeservice.dto.response.transaction;

import java.util.List;
import lombok.Builder;

@Builder
public record TransactionListResponse(
    int totalCount,
    List<TransactionResponse> list
) {

}
