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
            /n
            <b>DemandDepositCreateRequest</b>

            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | bankCode           | String  | 은행 코드 (필수, 3자리)              |
            | accountName        | String  | 상품명 (필수, 최대 20자)             |
            | accountDescription | String  | 상품 설명 (선택, 최대 255자)         |
            /n
            """;

        public static final String ACCOUNT_RESPONSE = """
            | result             | DemandDepositAccountResponse  | 응답 데이터 (API 결과 값)            |
            \n
            <b>DemandDepositAccountResponse</b>
            \n
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | username           | String  | 계좌 소유자 이름               |
            | accountNo          | String  | 계좌 번호 (해당 계좌의 고유 번호, 최대 16글자)    |
            | accountName        | String  | 계좌 이름 (사용자가 설정한 계좌명, 최대 20글자)   |
            | accountTypeCode    | String  | 계좌 유형 코드 (예: 1 : 수시입출금, 2: 정기예금, 3: 정기적금) |
            | accountTypeName    | String  | 계좌 유형 이름 (예: "수시입출금", "정기예금" 등) |
            | balance     | String  | 계좌 잔액 (현재 계좌의 잔고 금액)    |
            \n
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
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | statusCode         | int     | 상태 코드 (200: 성공, 400: 잘못된 요청, 404: 찾을 수 없음, 500: 서버 오류) |
            | message            | String  | 응답 메시지 (결과에 대한 설명)        |
            """;
    }
}
