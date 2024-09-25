package com.uhbooba.financeservice.dto.finapi.response.demand_deposit;

import lombok.Builder;

@Builder
public record DemandDepositAccountHolderResponse(
    String bankCode,
    String bankName,
    String accountNo,
    String userName,
    String currency
) {

    public static String description() {
        return """
            \n
            <b>DemandDepositAccountHolderResponse</b>
            \n
            | Name                  | Type    | Description          |
            |-----------------------|---------|----------------------|
            | bankCode              | String  | 은행 코드            |
            | bankName              | String  | 은행 이름            |
            | accountNo             | String  | 계좌 번호            |
            | userName              | String  | 사용자 이름          |
            | currency              | String  | 통화 코드            |
            \n
            """;
    }
}
