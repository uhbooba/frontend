package com.uhbooba.financeservice.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.request.exchange.ExchangeGetEstimateRequest;
import com.uhbooba.financeservice.dto.finapi.request.exchange.ExchangeRequest;
import com.uhbooba.financeservice.dto.finapi.request.exchange.ForeignCurrencyDemandDepositCreateRequest;
import com.uhbooba.financeservice.dto.finapi.response.exchange.BankCurrencyResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ExchangeEstimateResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ExchangeRateResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ExchangeResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ForeignCurrencyAccountCreateResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ForeignCurrencyAccountResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ForeignCurrencyProductResponse;
import com.uhbooba.financeservice.entity.Account;
import com.uhbooba.financeservice.entity.AccountType;
import com.uhbooba.financeservice.entity.UserAccount;
import com.uhbooba.financeservice.exception.ForeignCurrencyDemandDepositAccountAlreadyExistException;
import com.uhbooba.financeservice.exception.NotFoundException;
import com.uhbooba.financeservice.mapper.AccountMapper;
import com.uhbooba.financeservice.repository.AccountRepository;
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

    private final JsonToDtoConverter jsonToDtoConverter;

    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;


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

    public ExchangeResponse doExchange(
        Integer userId,
        ExchangeRequest exchangeRequest
    ) {
        String userKey = getUserKey(userId);
        JsonNode exchangeResult = finApiExchangeService.exchange(userKey, exchangeRequest)
                                                       .block();
        return jsonToDtoConverter.convertToObject(exchangeResult, ExchangeResponse.class);
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
        Account account = accountMapper.toEntity(accountResponse);
        account.setUserAccount(userAccount);  // 사용자 계정과 연결
        account.setAccountTypeName("외화 수시입출금");
        account.setAccountTypeCode(ACCOUNT_TYPE);
        accountRepository.save(account);

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
        List<Account> accountList = accountRepository.findByAccountTypeCodeAndUserAccount(
            ACCOUNT_TYPE, userAccount);
        if(accountList.isEmpty()) {
            throw new NotFoundException("해당 사용자에 대해 외화 수시 입출금 계좌를 찾을 수 없습니다.");
        }
        if(accountList.size() > 1) {
            throw new ForeignCurrencyDemandDepositAccountAlreadyExistException();
        }
        return accountList.get(0);
    }
}
