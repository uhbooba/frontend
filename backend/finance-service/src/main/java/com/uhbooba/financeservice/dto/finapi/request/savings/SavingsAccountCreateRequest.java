package com.uhbooba.financeservice.dto.finapi.request.savings;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record SavingsAccountCreateRequest(
    @NotBlank(message = "출금할 수시입출금 계좌번호를 입력하세요") @Size(max = 20) String withdrawalAccountNo,
    @NotBlank(message = "가입할 적금 상품고유번호를 입력하세요") @Size(max = 20) String accountTypeUniqueNo,
    @NotNull Long savingsBalance,
    @NotBlank(message = "비밀번호는 필수입니다.") String password
) {

}
