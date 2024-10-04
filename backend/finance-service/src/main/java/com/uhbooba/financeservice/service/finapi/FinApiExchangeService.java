package com.uhbooba.financeservice.service.finapi;

import static com.uhbooba.financeservice.util.finapi.FinApiList.Exchange.*;

import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.HandlerParamWithHeader;
import com.uhbooba.financeservice.dto.finapi.request.exchange.ExchangeGetEstimateRequest;
import com.uhbooba.financeservice.dto.finapi.request.exchange.ExchangeRequest;
import com.uhbooba.financeservice.dto.finapi.request.exchange.ForeignCurrencyDemandDepositCreateRequest;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class FinApiExchangeService {

    private final FinApiCommonService finApiCommonService;

    public Mono<JsonNode> getExchangeRate(String currency) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("currency", currency.toUpperCase()); // 대문자

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_EXCHANGE_RATE_SEARCH_URL)
                                                             .apiName(EXCHANGE_RATE_SEARCH_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> getAllExchangeRate() {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(EXCHANGE_RATE_URL)
                                                             .apiName(EXCHANGE_RATE_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> getExchangeEstimate(
        ExchangeGetEstimateRequest exchangeGetEstimateRequest
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("currency", exchangeGetEstimateRequest.fromCurrency()
                                                              .toUpperCase()); // 대문자
        requestBody.put("exchangeCurrency", exchangeGetEstimateRequest.toCurrency()
                                                                      .toUpperCase()); // 대문자
        requestBody.put("amount", exchangeGetEstimateRequest.amount());

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_EXCHANGE_ESTIMATE_URL)
                                                             .apiName(ESTIMATE_EXCHANGE_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> exchange(
        String userKey,
        ExchangeRequest exchangeRequest
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountNo", exchangeRequest.accountNo());
        requestBody.put("exchangeCurrency", exchangeRequest.exchangeCurrency()
                                                           .toUpperCase()); // 대문자
        requestBody.put("exchangeAmount",
                        exchangeRequest.exchangeAmount() // api 문서에 double 이라고 되어있는데 int 만 받음
                                       .intValue());

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(EXCHANGE_URL)
                                                             .apiName(EXCHANGE_API_NAME)
                                                             .requestBody(requestBody)
                                                             .userKey(userKey)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> getBackCurrency() {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_BANK_CURRENCY_URL)
                                                             .apiName(
                                                                 INQUIRE_BANK_CURRENCY_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> createForeignCurrencyDemandDeposit(
        ForeignCurrencyDemandDepositCreateRequest request
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("bankCode", request.bankCode()
                                           .toUpperCase());
        requestBody.put("accountName", request.accountName());
        requestBody.put("accountDescription", request.accountDescription());

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(
                                                                 CREATE_FOREIGN_CURRENCY_DEMAND_DEPOSIT_URL)
                                                             .apiName(
                                                                 CREATE_FOREIGN_CURRENCY_DEMAND_DEPOSIT_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();

        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> getForeignCurrencyDemandDepositList(

    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(
                                                                 GET_FOREIGN_CURRENCY_DEMAND_DEPOSIT_LIST_URL)
                                                             .apiName(
                                                                 GET_FOREIGN_CURRENCY_DEMAND_DEPOSIT_LIST_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> createForeignCurrencyDemandDepositAccount(
        String userKey,
        String accountTypeUniqueNo,
        String currency
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();

        requestBody.put("accountTypeUniqueNo", accountTypeUniqueNo);
        requestBody.put("currency", currency);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(
                                                                 CREATE_FOREIGN_CURRENCY_DEMAND_DEPOSIT_ACCOUNT_URL)
                                                             .apiName(
                                                                 CREATE_FOREIGN_CURRENCY_DEMAND_DEPOSIT_ACCOUNT_API_NAME)
                                                             .requestBody(requestBody)
                                                             .userKey(userKey)
                                                             .build();
        System.out.println(param);
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> getForeignCurrencyDemandDepositAccountList(
        String userKey
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(
                                                                 GET_FOREIGN_CURRENCY_DEMAND_DEPOSIT_ACCOUNT_LIST_URL)
                                                             .apiName(
                                                                 GET_FOREIGN_CURRENCY_DEMAND_DEPOSIT_ACCOUNT_LIST_API_NAME)
                                                             .requestBody(requestBody)
                                                             .userKey(userKey)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> getForeignCurrencyDemandDepositAccount(
        String userKey,
        String accountNo
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountNo", accountNo);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(
                                                                 GET_FOREIGN_CURRENCY_DEMAND_DEPOSIT_ACCOUNT_URL)
                                                             .apiName(
                                                                 GET_FOREIGN_CURRENCY_DEMAND_DEPOSIT_ACCOUNT_API_NAME)
                                                             .requestBody(requestBody)
                                                             .userKey(userKey)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }
}
