package com.uhbooba.financeservice.service.finapi;

import static com.uhbooba.financeservice.util.finapi.FinApiList.Deposit.*;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.uhbooba.financeservice.dto.finapi.HandlerParamWithHeader;
import com.uhbooba.financeservice.dto.finapi.deposit.DepositAccountCreateRequest;
import com.uhbooba.financeservice.dto.finapi.deposit.DepositCreateRequest;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class FinApiDepositService {

    private final FinApiCommonService finApiCommonService;
    private final ObjectMapper objectMapper;

    public Mono<JsonNode> createDeposit(
        DepositCreateRequest dto
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = objectMapper.convertValue(dto, Map.class);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(CREATE_DEPOSIT_URL)
                                                             .apiName(CREATE_DEPOSIT_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> getDepositProducts() {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_DEPOSIT_PRODUCTS_URL)
                                                             .apiName(GET_DEPOSIT_PRODUCTS_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> createDepositAccount(
        String userKey,
        DepositAccountCreateRequest dto
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = objectMapper.convertValue(dto, Map.class);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(CREATE_DEPOSIT_ACCOUNT_URL)
                                                             .apiName(
                                                                 CREATE_DEPOSIT_ACCOUNT_API_NAME)
                                                             .requestBody(requestBody)
                                                             .userKey(userKey)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> getDepositAccount(
        String userKey,
        String accountNo
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountNo", accountNo);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_DEPOSIT_ACCOUNT_DETAIL_URL)
                                                             .userKey(userKey)
                                                             .apiName(
                                                                 GET_DEPOSIT_ACCOUNT_DETAIL_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> getDepositAccounts(String userKey) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_DEPOSIT_ACCOUNT_LIST_URL)
                                                             .userKey(userKey)
                                                             .apiName(
                                                                 GET_DEPOSIT_ACCOUNT_LIST_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> getDepositExpiryInterest(
        String userKey,
        String accountNo
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountNo", accountNo);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_EXPIRY_INTEREST_URL)
                                                             .userKey(userKey)
                                                             .apiName(GET_EXPIRY_INTEREST_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> getDepositEarlyTerminationInterest(
        String userKey,
        String accountNo
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountNo", accountNo);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_EARLY_TERMINATION_URL)
                                                             .userKey(userKey)
                                                             .apiName(
                                                                 GET_EARLY_TERMINATION_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    public Mono<JsonNode> deleteDepositAccount(
        String userKey,
        String accountNo
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountNo", accountNo);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(DELETE_ACCOUNT_URL)
                                                             .userKey(userKey)
                                                             .apiName(DELETE_ACCOUNT_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }
}
