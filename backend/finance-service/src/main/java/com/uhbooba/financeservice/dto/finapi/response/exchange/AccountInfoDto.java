package com.uhbooba.financeservice.dto.finapi.response.exchange;

import lombok.Builder;

@Builder
public record AccountInfoDto(
    String accountNo,
    String amount,
    String balance
) {

}
