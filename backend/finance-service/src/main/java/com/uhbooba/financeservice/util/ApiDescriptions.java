package com.uhbooba.financeservice.util;

public class ApiDescriptions {

    public static class CommonController {

        public static final String USER_ACCOUNT_RESPONSE = """
            \n
            <b>UserAccountResponse</b>
            \n
            | Name             | Type    | Description          |
            |------------------|---------|----------------------|
            | userId           | String  | 사용자 ID             |
            | userName         | String  | 사용자 이름           |
            | institutionCode  | String  | 기관 코드             |
            | userKey          | String  | 사용자 고유 키        |
            | created          | String  | 계정 생성 날짜         |
            | modified         | String  | 계정 수정 날짜         |
            \n
            """;
    }

    public static class DemandDepositController {

        public static final String DEMAND_DEPOSIT_CREATE_REQUEST = """
            <b>DemandDepositCreateRequest</b>

            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | bankCode           | String  | 은행 코드 (필수, 3자리)              |
            | accountName        | String  | 상품명 (필수, 최대 20자)             |
            | accountDescription | String  | 상품 설명 (선택, 최대 255자)         |
            """;


    }

    public static class Common {

        public static final String INPUT = """
            \n
            ## Input
            \n
            """;
        public static final String OUTPUT = """
            \n
            ## Output
            \n
            """;
    }
}
