package com.uhbooba.financeservice.dto.finapi.response.demand_deposit;

import lombok.Builder;

@Builder
public record DemandDepositAccountBalanceResponse(
    String bankCode,
    String accountNo,
    String accountBalance,
    String accountCreatedDate,
    String accountExpiryDate,
    String lastTransactionDate,
    String currency
) {

    public static String description() {
        return """
            \n
            <b>DemandDepositAccountBalanceResponse</b>
            \n
            | Name                  | Type    | Description          |
            |-----------------------|---------|----------------------|
            | bankCode              | String  | 은행 코드            |
            | accountNo             | String  | 계좌 번호            |
            | accountBalance        | String  | 계좌 잔액            |
            | accountCreatedDate    | String  | 계좌 개설 일자        |
            | accountExpiryDate     | String  | 계좌 만기 일자        |
            | lastTransactionDate   | String  | 마지막 거래 일자      |
            | currency              | String  | 통화 코드            |
            \n
            """;
    }
}
