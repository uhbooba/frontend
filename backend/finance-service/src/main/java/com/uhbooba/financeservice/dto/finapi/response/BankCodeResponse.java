package com.uhbooba.financeservice.dto.finapi.response;

import lombok.Builder;

@Builder
public record BankCodeResponse(
    String bankCode,
    String bankName
) {

}
