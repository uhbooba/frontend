package com.uhbooba.financeservice.service.finapi;

import static com.uhbooba.financeservice.util.finapi.FinApiList.Savings.*;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.uhbooba.financeservice.dto.finapi.HandlerParamWithHeader;
import com.uhbooba.financeservice.dto.finapi.request.savings.SavingsAccountCreateRequest;
import com.uhbooba.financeservice.dto.finapi.request.savings.SavingsCreateRequest;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class FinApiSavingsService {

    private final FinApiCommonService finApiCommonService;
    private final ObjectMapper objectMapper;

    public Mono<JsonNode> createSavings(
        SavingsCreateRequest dto
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = objectMapper.convertValue(dto, Map.class);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(CREATE_SAVINGS_PRODUCT_URL)
                                                             .apiName(
                                                                 CREATE_SAVINGS_PRODUCT_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> getSavingsProducts() {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_SAVINGS_PRODUCTS_URL)
                                                             .apiName(GET_SAVINGS_PRODUCTS_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> createSavingsAccount(
        String userKey,
        SavingsAccountCreateRequest dto
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = objectMapper.convertValue(dto, Map.class);
        requestBody.put("withdrawalAccountNo", dto.withdrawalAccountNo());
        requestBody.put("accountTypeUniqueNo", dto.accountTypeUniqueNo());
        requestBody.put("depositBalance", dto.savingsBalance());

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(CREATE_SAVINGS_ACCOUNT_URL)
                                                             .apiName(
                                                                 CREATE_SAVINGS_ACCOUNT_API_NAME)
                                                             .requestBody(requestBody)
                                                             .userKey(userKey)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> getSavingsAccount(
        String userKey,
        String accountNo
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountNo", accountNo);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_SAVINGS_ACCOUNT_DETAIL_URL)
                                                             .userKey(userKey)
                                                             .apiName(
                                                                 GET_SAVINGS_ACCOUNT_DETAIL_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> getSavingsAccounts(String userKey) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_SAVINGS_ACCOUNT_LIST_URL)
                                                             .userKey(userKey)
                                                             .apiName(
                                                                 GET_SAVINGS_ACCOUNT_LIST_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> getSavingsExpiryInterest(
        String userKey,
        String accountNo
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountNo", accountNo);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_SAVINGS_EXPIRY_INTEREST_URL)
                                                             .userKey(userKey)
                                                             .apiName(
                                                                 GET_SAVINGS_EXPIRY_INTEREST_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> getSavingsEarlyTerminationInterest(
        String userKey,
        String accountNo
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountNo", accountNo);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(
                                                                 GET_SAVINGS_EARLY_TERMINATION_INTEREST_URL)
                                                             .userKey(userKey)
                                                             .apiName(
                                                                 GET_SAVINGS_EARLY_TERMINATION_INTEREST_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> deleteSavingsAccount(
        String userKey,
        String accountNo
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountNo", accountNo);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(DELETE_SAVINGS_ACCOUNT_URL)
                                                             .userKey(userKey)
                                                             .apiName(
                                                                 DELETE_SAVINGS_ACCOUNT_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }
}
