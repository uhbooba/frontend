package com.uhbooba.financeservice.dto.finapi.request.deposit;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record DepositCreateRequest(

    // 은행코드는 3자리 필수 입력
    @NotBlank(message = "은행 코드는 필수입니다.") @Size(min = 3, max = 3, message = "은행 코드는 정확히 3자리여야 합니다.") String bankCode,

    // 상품명은 최대 20자리 필수 입력
    @NotBlank(message = "상품명은 필수입니다.") @Size(max = 20, message = "상품명은 최대 20자까지 입력 가능합니다.") String accountName,

    // 상품 설명은 선택사항, 최대 255자
    @Size(max = 255, message = "상품 설명은 최대 255자까지 입력 가능합니다.") String accountDescription,

    // 가입 기간은 필수, 2일 이상 365일 이하
    @NotBlank(message = "가입 기간은 필수입니다.") @Size(max = 20, message = "가입 기간은 최대 20자까지 입력 가능합니다.") String subscriptionPeriod,

    // 최소 가입 금액은 필수, 1 이상
    @NotNull(message = "최소 가입 금액은 필수입니다.") @Min(value = 1, message = "최소 가입 금액은 1 이상이어야 합니다.") Long minSubscriptionBalance,

    // 최대 가입 금액은 필수, 1억 이하
    @NotNull(message = "최대 가입 금액은 필수입니다.") @Max(value = 100000000, message = "최대 가입 금액은 1억 이하이어야 합니다.") Long maxSubscriptionBalance,

    // 이자율은 필수, 0.1 이상 20 이하
    @NotNull(message = "이자율은 필수입니다.") @DecimalMin(value = "0.1", message = "이자율은 0.1 이상이어야 합니다.") @DecimalMax(value = "20.0", message = "이자율은 20 이하이어야 합니다.") Double interestRate,

    // 이자율 설명은 선택사항, 최대 255자
    @Size(max = 255, message = "이자율 설명은 최대 255자까지 입력 가능합니다.") String rateDescription
) {}
