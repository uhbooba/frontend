package com.uhbooba.financeservice.dto.finapi.request.demand_deposit;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record DemandDepositGetTransactionRequest(
    @NotBlank(message = "계좌번호는 필수입니다.") String accountNo,
    @NotBlank(message = "거래 고유 번호는 필수입니다.") Long transactionUniqueNo
) {

}
