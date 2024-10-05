package com.uhbooba.financeservice.dto.finapi.request.exchange;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record ExchangeRequest(

    // 출금 계좌번호는 필수이며, 최대 16자리
    @NotBlank(message = "출금 계좌번호는 필수입니다.") @Size(max = 16, message = "출금 계좌번호는 최대 16자리까지 입력 가능합니다.") String accountNo,

    // 환전 통화 코드는 필수이며, 최대 8자리
    @NotBlank(message = "환전 통화 코드는 필수입니다.") @Size(max = 8, message = "환전 통화 코드는 최대 8자리까지 입력 가능합니다.") String exchangeCurrency,

    // 환전 금액은 필수이며, 최소 10 이상
    @NotNull(message = "환전 금액은 필수입니다.") @DecimalMin(value = "10.0", message = "달러는 최소 100달러 이상이어야 합니다.") Long exchangeAmount
) {}
