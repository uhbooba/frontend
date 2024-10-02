package com.uhbooba.financeservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record UtilityPaymentRequest(
    @NotBlank String corporation,
    @NotNull Long amount
) {

}
