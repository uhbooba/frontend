package com.uhbooba.financeservice.dto.finapi.request.demand_deposit;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record DemandDepositCreateRequest(

    @Size(min = 3, max = 3, message = "은행 코드는 정확히 세자리 입니다.") @Schema(example = "999") String bankCode,
    @NotBlank(message = "상품명은 필수입니다.") @Size(max = 20, message = "상품명은 최대 20자까지 가능합니다.") String accountName,
    @Size(max = 255, message = "상품 설명은 최대 255자까지 입력 가능합니다.") String accountDescription

) {}
