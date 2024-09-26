package com.uhbooba.financeservice.dto.finapi.request.demand_deposit;

import com.uhbooba.financeservice.entity.TransactionType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record DemandDepositGetTransactionsRequest(

    @NotBlank(message = "계좌번호는 필수입니다.") @Size(max = 16, message = "계좌번호는 최대 16자리입니다.") String accountNo,

    @NotBlank(message = "조회 시작일은 필수입니다.") @Pattern(regexp = "\\d{8}", message = "조회 시작일자는 YYYYMMDD 형식이어야 합니다.") String startDate,

    @NotBlank(message = "조회 종료일은 필수입니다.") @Pattern(regexp = "\\d{8}", message = "조회 종료일자는 YYYYMMDD 형식이어야 합니다.") String endDate,

    @NotBlank(message = "거래 구분은 필수입니다.") @Pattern(regexp = "[MDA]", message = "거래 구분은 M(입금), D(출금), A(전체) 중 하나여야 합니다.") String transactionType,

    @NotBlank(message = "정렬 순서는 필수입니다.") @Pattern(regexp = "ASC|DESC", message = "정렬 순서는 ASC(오름차순) 또는 DESC(내림차순)이어야 합니다.") String orderByType
) {}
