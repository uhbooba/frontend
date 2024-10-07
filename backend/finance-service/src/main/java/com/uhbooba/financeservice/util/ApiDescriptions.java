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
        public static final String DEPOSIT_INPUT = """
            | accountNo | string | 입금받을 계좌 번호 |
            | transactionBalance | number | 입금 금액 |
            | transactionSummary | string | 거래 내역에 메모할 내용 |
            """;

        public static final String TRANSFER_INPUT = """
            | depositAccountNo | string | 이체받을 계좌 번호 |
            | depositTransactionSummary | string | 이체받을 계좌 거래내역에 메모할 내용 |
            | transactionBalance | number | 이체 금액 |
            | withdrawalAccountNo | string | 출금할 계좌 번호 |
            | withdrawalTransactionSummary | string | 출금계좌 거래내역에 메모할 내용 |
            """;

        public static final String DEMAND_DEPOSIT_DEPOSIT_RESPONSE = """
                        
            <b>DemandDepositDepositResponse</b>
                        
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | transactionUniqueNo           | String  | 거래 내역 식별자(외부 API 용)              |
            | transactionDate        | String  | 거래 일시(YYYYMMDD)             |
                        
            """;

        public static final String ACCOUNT_CREATE_RESPONSE = """
            | result             | DemandDepositAccountResponse  | 응답 데이터 (API 결과 값)            |
            \n
            <b>DemandDepositAccountResponse</b>
            \n
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | bankCode          | String | 은행코드 |
            | bankName          | String | 은행이름 |
            | username          | String | 소유주이름(영어로되더있는 필요없는 값) |
            | accountNo         | String | 계좌번호 |
            | accountName           | String | 계좌이름(상품이름) |
            | accountTypeCode           | String | 계좌 유형 |
            | accountTypeName           | String | Enum(DEMAND_DEPOSIT,FIXED_DEPOSIT,INSTALLMENT_SAVING) |
            | accountBalance            | String | 계좌 잔액 |
            | currency          | String | 계좌 통화 |
            \n
            """;

        public static final String ACCOUNT_RESPONSE = """
            | result             | AccountResponse  | 응답 데이터 (API 결과 값)            |
            \n
            <b>AccountResponse</b>
            \n
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | username           | String  | 계좌 소유자 이름               |
            | accountNo          | String  | 계좌 번호 (해당 계좌의 고유 번호, 최대 16글자)    |
            | accountName        | String  | 계좌 이름 (사용자가 설정한 계좌명, 최대 20글자)   |
            | accountTypeCode    | String  | Enum(DEMAND_DEPOSIT,FIXED_DEPOSIT,INSTALLMENT_SAVING) |
            | accountTypeName    | String  | 계좌 유형 이름 (예: "수시입출금", "예금","적금" 등) |
            | balance     | Long  | 계좌 잔액 (현재 계좌의 잔고 금액)    |
            \n
            """;
    }

    public static class Deposit {

        public static final String DEPOSIT_PRODUCT_RESPONSE = """
            | result             | DepositResponse  | 응답 데이터 (API 결과 값)            |
            \n
            <b>DepositResponse</b>
            \n
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | accountTypeUniqueNo | String |  예금 상품 식별자                         | 
            | bankCode | String |           은행 코드                | 
            | bankName | String |             은행 이름            | 
            | accountTypeCode | String |          계좌 종류                  | 
            | accountTypeName | String |            계좌 종류 이름               | 
            | accountName | String |                     계좌 이름       | 
            | accountDescription | String |                 계좌 설명           | 
            | subscriptionPeriod | String |              가입 기간           | 
            | minSubscriptionBalance | String |        최소 가입 금액                    | 
            | maxSubscriptionBalance | String |         최대 가입 금액                 | 
            | interestRate | String |         이율           | 
            | rateDescription | String |         이율 설명               | 
            """;
        public static final String DEPOSIT_ACCOUNT_CREATE = """
            | withdrawalAccountNo | string | 출금할 수시입출금 계좌번호 |
            | accountTypeUniqueNo | string | 가입할 예금 상품고유번호 |
            | depositBalance | number | 예금 금액(최소 이상, 최대 이하) |
            """;

        public static final String DEPOSIT_ACCOUNT_RESPONSE = """
            | result             | DepositAccountResponse  | 응답 데이터 (API 결과 값)            |
            \n
            <b>DepositAccountResponse</b>
            \n
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | bankCode | String |  은행 코드                         |
            | bankName | String |           은행 이름               |
            | accountNo | String |            계좌 종류             |
            | accountName | String |          계좌 종류 이름                 |
            | withdrawalBankCode | String |            출금 은행               |
            | withdrawalAccountNo | String |                   출금 계좌 번호       |
            | subscriptionPeriod | String |                 가입 기간        |
            | depositBalance | String |              가입 금액      |
            | interestRate | String |        이율                |
            | accountCreateDate | String |      계좌 개설일                 |
            | accountExpiryDate | String |         계좌 마감일|
            """;

        public static final String DEPOSIT_ACCOUNT_LIST_RESPONSE = """
            | result             | list(DepositAccountResponse)  | 응답 데이터 (API 결과 값)            |
            \n
            <b>DepositAccountResponse</b>
            \n
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | bankCode | String |  은행 코드                         |
            | bankName | String |           은행 이름               |
            | accountNo | String |            계좌 종류             |
            | accountName | String |          계좌 종류 이름                 |
            | withdrawalBankCode | String |            출금 은행               |
            | withdrawalAccountNo | String |                   출금 계좌 번호       |
            | subscriptionPeriod | String |                 가입 기간        |
            | depositBalance | String |              가입 금액      |
            | interestRate | String |        이율                |
            | accountCreateDate | String |      계좌 개설일                 |
            | accountExpiryDate | String |         계좌 마감일|
            """;

        public static final String DEPOSIT_EXPIRE_RESPONSE = """
            | result             | DepositExpiryInterestResponse  | 응답 데이터 (API 결과 값)            |
            \n
            <b>DepositExpiryInterestResponse</b>
            \n
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | bankCode | String |  은행 코드                         |
            | bankName | String |           은행 이름               |
            | accountNo | String |            계좌 종류             |
            | accountName | String |          계좌 종류 이름                 |
            | interestRate | String |            이율               |
            | accountCreateDate | String |          예금 개설일       |
            | accountExpiryDate | String |           예금 마감일       |
            | expiryBalance | String |      예금 종료 금액     |
            | expiryInterest | String |        이율           |
            | expiryTotalBalance | String |      총 이자 금액                 |
            """;

        public static final String EARLY_DEPOSIT_EXPIRE_RESPONSE = """
            | result             | DepositEarlyTerminationInterestResponse  | 응답 데이터 (API 결과 값)            |
            \n
            <b>DepositEarlyTerminationInterestResponse</b>
            \n
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | bankCode | String |  은행 코드                         |
            | bankName | String |           은행 이름               |
            | accountNo | String |            계좌 종류             |
            | accountName | String |          계좌 종류 이름                 |
            | interestRate | String |            이율               |
            | accountCreateDate | String |          예금 개설일       |
            | earlyTerminationDate | String |           예금 중단일       |
            | depositBalance | String |      예금 금액     |
            | earlyTerminationInterest | String |        중도 해지 이율           |
            | earlyTerminationBalance | String |      중도 해지로 인한 최종 금액                |
            """;
    }

    public static class Exchange {

        public static final String EXCHANGE_RATE_RESPONSE = """
            | result             | ExchangeRateResponse  | 응답 데이터 (API 결과 값)            |
            \n
            <b>ExchangeRateResponse</b>
            \n
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | id | String |  식별자(사용X)                        |
            | currency | String |          통화               |
            | exchangeRate | String |         환율             |
            | exchangeMin | String |          최소 환전금액                 |
            | created | String |                      |
            """;

        public static final String EXCHANGE_ESTIMATE_REQ = """
            | fromCurrency | string | 기존 통화 |
            | toCurrency | string | 환전 통화 |
            | amount | number | 환전 금액(환전 금액은 최소 10 단위로 입력해야 합니다. USD 의 경우 최소 100달러 이상부터 입니다.) |
            """;

        public static final String EXCHANGE_ESTIMATE_RES = """
            | result             | ExchangeEstimateResponse  | 응답 데이터 (API 결과 값)            |
            \n
            <b>ExchangeEstimateResponse</b>
            \n
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | currency | ExchangeEstimateCurrencyResponse |  기존 통화                        |
            | exchangeCurrency | ExchangeEstimateCurrencyResponse |  환전 통화               |
                        
            \n
            <b>ExchangeEstimateCurrencyResponse</b>
            \n
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | amount | string |  금액                        |
            | currency | string |  통화               |
            | currencyName | string |  통화 이름               |
            """;

        public static final String EXCHANGE_REQ = """
            | accountNo | string | 출금할 입출금 계좌 |
            | exchangeCurrency | string | 환전할 통화 |
            | exchangeAmount | number | 환전 금액(환전 금액은 최소 10 단위로 입력해야 합니다. USD 의 경우 최소 100달러 이상부터 입니다.) |
            """;

        public static final String EXCHANGE_RES = """
            | result             | ExchangeResponse  | 응답 데이터 (API 결과 값)            |
            \n
            <b>ExchangeResponse</b>
            \n
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | exchangeCurrency | ExchangeCurrencyDto |  환전 정보                        |
            | accountInfo | AccountInfoDto |  계좌 정보             |
                        
            \n
            <b>ExchangeCurrencyDto</b>
            \n
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | amount | string |  환전 금액                        |
            | exchangeRate | string |  환율               |
            | currency | string |  통화               |
            | currencyName | string |  통화 이름               |
                        
            \n
            <b>AccountInfoDto</b>
            \n
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | accountNo | string |  계좌 번호                        |
            | amount | string |  환전에 쓰인 금액          |
            | balance | string |  잔액             |
            """;
    }

    public static class Savings {

        public static final String SAVINGS_PRODUCT_RESPONSE = """
            | result             | SavingsResponse  | 응답 데이터 (API 결과 값)            |
            \n
            <b>SavingsResponse</b>
            \n
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | accountTypeUniqueNo | String |  적금 상품 식별자                         | 
            | bankCode | String |           은행 코드                | 
            | bankName | String |             은행 이름            | 
            | accountTypeCode | String |          계좌 종류                  | 
            | accountTypeName | String |            계좌 종류 이름               | 
            | accountName | String |                     계좌 이름       | 
            | accountDescription | String |                 계좌 설명           | 
            | subscriptionPeriod | String |              가입 기간           | 
            | minSubscriptionBalance | String |        최소 가입 금액                    | 
            | maxSubscriptionBalance | String |         최대 가입 금액                 | 
            | interestRate | String |         이율           | 
            | rateDescription | String |         이율 설명               | 
            """;
        public static final String SAVINGS_ACCOUNT_CREATE = """
            | withdrawalAccountNo | string | 출금할 수시입출금 계좌번호 |
            | accountTypeUniqueNo | string | 가입할 적금 상품고유번호 |
            | depositBalance | number | 적금 금액(최소 이상, 최대 이하) |
            """;

        public static final String SAVINGS_ACCOUNT_RESPONSE = """
            | result             | SavingsAccountResponse  | 응답 데이터 (API 결과 값)            |
            \n
            <b>SavingsAccountResponse</b>
            \n
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | bankCode | String |  은행 코드                         |
            | bankName | String |           은행 이름               |
            | accountNo | String |            계좌 종류             |
            | accountName | String |          계좌 종류 이름                 |
            | withdrawalBankCode | String |            출금 은행               |
            | withdrawalAccountNo | String |                   출금 계좌 번호       |
            | subscriptionPeriod | String |                 가입 기간        |
            | depositBalance | String |              가입 금액      |
            | interestRate | String |        이율                |
            | accountCreateDate | String |      계좌 개설일                 |
            | accountExpiryDate | String |         계좌 마감일|
            """;

        public static final String SAVINGS_ACCOUNT_LIST_RESPONSE = """
            | result             | list(SavingsAccountResponse)  | 응답 데이터 (API 결과 값)            |
            \n
            <b>SavingsAccountResponse</b>
            \n
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | bankCode | String |  은행 코드                         |
            | bankName | String |           은행 이름               |
            | accountNo | String |            계좌 종류             |
            | accountName | String |          계좌 종류 이름                 |
            | withdrawalBankCode | String |            출금 은행               |
            | withdrawalAccountNo | String |                   출금 계좌 번호       |
            | subscriptionPeriod | String |                 가입 기간        |
            | depositBalance | String |              가입 금액      |
            | interestRate | String |        이율                |
            | accountCreateDate | String |      계좌 개설일                 |
            | accountExpiryDate | String |         계좌 마감일|
            """;

        public static final String SAVINGS_EXPIRE_RESPONSE = """
            | result             | SavingsExpiryInterestResponse  | 응답 데이터 (API 결과 값)            |
            \n
            <b>SavingsExpiryInterestResponse</b>
            \n
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | bankCode | String |  은행 코드                         |
            | bankName | String |           은행 이름               |
            | accountNo | String |            계좌 종류             |
            | accountName | String |          계좌 종류 이름                 |
            | interestRate | String |            이율               |
            | accountCreateDate | String |          적금 개설일       |
            | accountExpiryDate | String |           적금 마감일       |
            | expiryBalance | String |      적금 종료 금액     |
            | expiryInterest | String |        이율           |
            | expiryTotalBalance | String |      총 이자 금액                 |
            """;

        public static final String EARLY_SAVINGS_EXPIRE_RESPONSE = """
            | result             | SavingsEarlyTerminationInterestResponse  | 응답 데이터 (API 결과 값)            |
            \n
            <b>SavingsEarlyTerminationInterestResponse</b>
            \n
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
            | bankCode | String |  은행 코드                         |
            | bankName | String |           은행 이름               |
            | accountNo | String |            계좌 종류             |
            | accountName | String |          계좌 종류 이름                 |
            | interestRate | String |            이율               |
            | accountCreateDate | String |          적금 개설일       |
            | earlyTerminationDate | String |           적금 중단일       |
            | depositBalance | String |      적금 금액     |
            | earlyTerminationInterest | String |        중도 해지 이율           |
            | earlyTerminationBalance | String |      중도 해지로 인한 최종 금액                |
            """;
    }

    public static class Input {

        public static final String ACCOUNT_NO = """
            | accountNo | String | 계좌 번호(최대 16글자) |
            """;

        public static final String CURRENCY = """
            | currency | String | 통화(예시: USD, JPY, KRW 등) |
            """;

        public static final String PASSWORD = """
            | password | String |  비밀번호           |
            """;
    }

    public static class Common {

        public static final String INPUT = """
            \n
            ## Input
            | Name               | Type    | Description                          |
            |--------------------|---------|--------------------------------------|
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
