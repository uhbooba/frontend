package com.uhbooba.financeservice.dto.finapi.request.demand_deposit;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record DemandDepositDepositAccountRequest(
    @NotBlank(message = "계좌번호는 필수입니다.") @Size(max = 16, message = "계좌번호는 16자리입니다.") String accountNo,
    @NotBlank(message = "입금금액은 필수입니다.") Long transactionBalance,
    @Size(max = 255, message = "최대 255글자입니다.") String transactionSummary
) {}
