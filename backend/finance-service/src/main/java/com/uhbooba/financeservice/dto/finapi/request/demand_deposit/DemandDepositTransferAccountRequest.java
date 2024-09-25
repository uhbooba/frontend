package com.uhbooba.financeservice.dto.finapi.request.demand_deposit;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record DemandDepositTransferAccountRequest(
    @NotBlank(message = "입금 계좌번호는 필수입니다.") @Size(max = 16, message = "계좌번호는 16글자입니다.") String depositAccountNo,
    @Size(max = 255, message = "최대 255자입니다.") String depositTransactionSummary,
    @NotBlank(message = "거래금액은 필수입니다.") Long transactionBalance,
    @NotBlank(message = "출금 계좌번호는 필수입니다.") @Size(max = 16, message = "계좌번호는 16글자입니다.") String withdrawalAccountNo,
    @Size(max = 255, message = "최대 255자입니다.") String withdrawalTransactionSummary
) {

}
