package com.uhbooba.financeservice.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.UserHeaderInfo;
import com.uhbooba.financeservice.dto.finapi.request.exchange.ExchangeGetEstimateRequest;
import com.uhbooba.financeservice.dto.finapi.request.exchange.ExchangeRequest;
import com.uhbooba.financeservice.dto.finapi.request.exchange.ForeignCurrencyDemandDepositCreateRequest;
import com.uhbooba.financeservice.dto.finapi.response.exchange.AccountInfoDto;
import com.uhbooba.financeservice.dto.finapi.response.exchange.BankCurrencyResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ExchangeCurrencyDto;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ExchangeEstimateResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ExchangeRateResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ExchangeResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ForeignCurrencyAccountCreateResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ForeignCurrencyAccountResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ForeignCurrencyProductResponse;
import com.uhbooba.financeservice.dto.request.TransactionUpdateRequest;
import com.uhbooba.financeservice.entity.Account;
import com.uhbooba.financeservice.entity.AccountType;
import com.uhbooba.financeservice.entity.Transaction;
import com.uhbooba.financeservice.entity.UserAccount;
import com.uhbooba.financeservice.exception.ExchangeFailedException;
import com.uhbooba.financeservice.exception.ForeignCurrencyDemandDepositAccountAlreadyExistException;
import com.uhbooba.financeservice.exception.NotFoundException;
import com.uhbooba.financeservice.service.finapi.FinApiExchangeService;
import com.uhbooba.financeservice.util.JsonToDtoConverter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExchangeService {

    @Value("${variables.bank-code}")
    private String bankCode;

    @Value("${variables.foreign-demand-deposit-product-id}")
    private String foreignDemandDepositProductId;

    private final String CURRENCY = "USD";
    private final AccountType ACCOUNT_TYPE = AccountType.FOREIGN_DEMAND_DEPOSIT;

    private final UserAccountService userAccountService;
    private final FinApiExchangeService finApiExchangeService;
    private final AccountService accountService;
    private final TransactionService transactionService;
    private final ExchangeAccountService exchangeAccountService;

    private final JsonToDtoConverter jsonToDtoConverter;


    public ExchangeRateResponse getExchangeRate(String currency) {
        JsonNode exchangeRate = finApiExchangeService.getExchangeRate(currency)
                                                     .block();
        return jsonToDtoConverter.convertToObject(exchangeRate, ExchangeRateResponse.class);
    }

    // 안 쓸 로직인듯
    public Object getAllExchangeRate() {
        return null;
    }

    private UserAccount getUserAccountByUserId(Integer userId) {
        return userAccountService.getUserAccountByUserId(userId);
    }

    private String getUserKey(Integer userId) {
        return userAccountService.getUserAccountByUserId(userId)
                                 .getUserKey();
    }

    public ExchangeEstimateResponse getExchangeEstimate(
        ExchangeGetEstimateRequest estimateRequest
    ) {
        JsonNode exchangeEstimate = finApiExchangeService.getExchangeEstimate(estimateRequest)
                                                         .block();
        return jsonToDtoConverter.convertToObject(exchangeEstimate, ExchangeEstimateResponse.class);
    }

    /**
     * 환전
     *
     * @param userId
     * @param exchangeRequest
     * @return
     */
    public ExchangeResponse doExchange(
        UserHeaderInfo userHeaderInfo,
        ExchangeRequest exchangeRequest
    ) {
        UserAccount userAccount = getUserAccountByUserId(userHeaderInfo.userId());
        String userKey = userAccount.getUserKey();

        Account account = accountService.findByAccountNo(exchangeRequest.accountNo());

        // transaction 생성
        Transaction transaction = transactionService.createTransactionRequest(exchangeRequest,
                                                                              account);

        try {
            JsonNode exchangeResult = finApiExchangeService.exchange(userKey, exchangeRequest)
                                                           .block();
            ExchangeResponse exchangeResponse = jsonToDtoConverter.convertToObject(exchangeResult,
                                                                                   ExchangeResponse.class);
            // 기존 입출금 계좌에 대한 transaction 처리(transaction unique no 가 없음)
            transactionService.updateTransactionForSuccess(transaction,
                                                           TransactionUpdateRequest.builder()
                                                                                   .transactionSummary(
                                                                                       createExchangeSummary(
                                                                                           exchangeResponse))
                                                                                   .build());
            String amountStr = exchangeResponse.accountInfo()
                                               .amount();
            double amountDouble = Double.parseDouble(amountStr);  // 문자열을 double로 변환
            long amountLong = (long) amountDouble;  // 소수점을 버리고 long으로 변환
            accountService.subtractAccountBalance(account, amountLong);

            exchangeAccountService.updateExchangeAccount(exchangeResponse, account);
            return exchangeResponse;
        } catch(Exception ex) {
            // 트랜잭션 실패 처리
            transactionService.updateTransactionForFail(transaction, ex);
            throw new ExchangeFailedException(ex.getMessage());
        }
    }

    public List<BankCurrencyResponse> getBackCurrency() {
        JsonNode backCurrency = finApiExchangeService.getBackCurrency()
                                                     .block();
        return jsonToDtoConverter.convertToList(backCurrency,
                                                new TypeReference<List<BankCurrencyResponse>>() {});
    }

    public ForeignCurrencyProductResponse createForeignCurrencyDemandDeposit(
        ForeignCurrencyDemandDepositCreateRequest request
    ) {
        JsonNode createdProduct = finApiExchangeService.createForeignCurrencyDemandDeposit(request)
                                                       .block();
        return jsonToDtoConverter.convertToObject(createdProduct,
                                                  ForeignCurrencyProductResponse.class);
    }

    public List<ForeignCurrencyProductResponse> getForeignCurrencyDemandDepositList(

    ) {
        JsonNode list = finApiExchangeService.getForeignCurrencyDemandDepositList()
                                             .block();
        return jsonToDtoConverter.convertToList(list,
                                                new TypeReference<List<ForeignCurrencyProductResponse>>() {});
    }

    public ForeignCurrencyAccountResponse createForeignCurrencyDemandDepositAccount(
        Integer userId
    ) {
        // 1. 사용자 계정 찾기
        UserAccount userAccount = getUserAccountByUserId(userId);

        // 2. 이미 외화 수시입출금 계좌가 있는지 확인 (필요하다면 로직 추가)
        try {
            getForeignCurrencyAccountInInternal(userAccount);
            throw new ForeignCurrencyDemandDepositAccountAlreadyExistException();
        } catch(NotFoundException e) {
            // 계좌가 없으면 계속 진행
        }

        // 3. 사용자 키 및 계좌 유형 정보 설정
        String userKey = userAccount.getUserKey();
        String accountTypeUniqueNo = foreignDemandDepositProductId;  // 외화 수시입출금 계좌 타입
        String currency = CURRENCY;  // 예: USD

        // 4. 외화 수시입출금 계좌 생성 (동기적 처리)
        JsonNode createdForeignCurrencyAccount = finApiExchangeService.createForeignCurrencyDemandDepositAccount(
                                                                          userKey, accountTypeUniqueNo, currency)
                                                                      .block();

        // JSON을 객체로 변환 후 반환
        ForeignCurrencyAccountCreateResponse createResponse = jsonToDtoConverter.convertToObject(
            createdForeignCurrencyAccount, ForeignCurrencyAccountCreateResponse.class);

        // 5. 생성된 계좌 상세 정보를 가져오기 (필요하다면 API 호출)
        ForeignCurrencyAccountResponse accountResponse = getForeignCurrencyAccountInFinApi(userKey,
                                                                                           createResponse.accountNo());

        // 6. DB에 외화 계좌 정보 저장
        accountService.createAccount(accountResponse, userAccount);

        return accountResponse;  // 최종 결과 반환
    }

    public List<ForeignCurrencyAccountResponse> getForeignCurrencyDemandDepositAccountList(
        Integer userId
    ) {
        String userKey = getUserKey(userId);
        JsonNode list = finApiExchangeService.getForeignCurrencyDemandDepositAccountList(userKey)
                                             .block();
        return jsonToDtoConverter.convertToList(list,
                                                new TypeReference<List<ForeignCurrencyAccountResponse>>() {});
    }

    private ForeignCurrencyAccountResponse getForeignCurrencyAccountInFinApi(
        String userKey,
        String accountNo
    ) {
        JsonNode demandDeposit = finApiExchangeService.getForeignCurrencyDemandDepositAccount(
                                                          userKey, accountNo)
                                                      .block();
        return jsonToDtoConverter.convertToObject(demandDeposit,
                                                  ForeignCurrencyAccountResponse.class);
    }

    private Account getForeignCurrencyAccountInInternal(
        UserAccount userAccount
    ) {
        List<Account> accountList = accountService.getAccountsByCondition(ACCOUNT_TYPE,
                                                                          userAccount);
        if(accountList.isEmpty()) {
            throw new NotFoundException("해당 사용자에 대해 외화 수시 입출금 계좌를 찾을 수 없습니다.");
        }
        if(accountList.size() > 1) {
            throw new ForeignCurrencyDemandDepositAccountAlreadyExistException();
        }
        return accountList.get(0);
    }

    // 구체적인 transaction summary 생성 메서드
    private String createExchangeSummary(ExchangeResponse request) {
        ExchangeCurrencyDto exchangeCurrency = request.exchangeCurrency();
        AccountInfoDto accountInfo = request.accountInfo();

        // 환전 내역을 설명하는 요약 정보 생성
        String summary = String.format("%s KRW -> %s %s (환율: %s)", accountInfo.amount(),
                                       exchangeCurrency.amount(), exchangeCurrency.currency(),
                                       exchangeCurrency.exchangeRate());

        return summary;
    }
}
