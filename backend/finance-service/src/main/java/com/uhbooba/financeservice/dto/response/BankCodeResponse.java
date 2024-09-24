package com.uhbooba.financeservice.dto.response;

import lombok.Builder;

@Builder
public record BankCodeResponse(
    String bankCode,
    String bankName
) {

}
