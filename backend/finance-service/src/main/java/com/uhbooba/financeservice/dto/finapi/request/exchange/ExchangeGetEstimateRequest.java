package com.uhbooba.financeservice.dto.finapi.request.exchange;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record ExchangeGetEstimateRequest(

    // 소유한 통화코드는 필수 입력
    @NotBlank(message = "소유 통화 코드는 필수입니다.") String fromCurrency,

    // 환전할 통화 코드는 최대 8자리이며 필수 입력
    @NotBlank(message = "환전 통화 코드는 필수입니다.") @Size(max = 8, message = "환전 통화 코드는 최대 8자리입니다.") String toCurrency,

    // 금액은 필수이며 10 이상 입력
    @NotNull(message = "환전 금액은 필수입니다.") @DecimalMin(value = "10.0", message = "환전 금액은 최소 10 단위로 입력해야 합니다.") Double amount
) {}
