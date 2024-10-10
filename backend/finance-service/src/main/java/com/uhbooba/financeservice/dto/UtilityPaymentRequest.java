package com.uhbooba.financeservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record UtilityPaymentRequest(
    @NotBlank String corporation,
    @NotNull Long amount,
    @NotBlank(message = "패스워드는 필수입니다.") String password
) {

}
