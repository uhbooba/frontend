package com.uhbooba.financeservice.service.finapi;

import static com.uhbooba.financeservice.service.finapi.CommonService.executeApiRequest;
import static com.uhbooba.financeservice.util.finapi.FinApiList.DemandDeposit.*;

import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.HandlerParamWithHeader;
import com.uhbooba.financeservice.util.finapi.FinOpenApiHandler;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class DemandDepositService {

    private final FinOpenApiHandler finOpenApiHandler;

    public Mono<JsonNode> createDemandDeposit(
        String bankCode,
        String accountName,
        String accountDescription
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("bankCode", bankCode);
        requestBody.put("accountName", accountName);
        requestBody.put("accountDescription", accountDescription);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(CREATE_DEPOSIT_URL)
                                                             .apiName(CREATE_DEPOSIT_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return executeApiRequest(param);
    }

    public Mono<JsonNode> createDemandDepositAccount(String accountTypeUniqueNo) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountTypeUniqueNo", accountTypeUniqueNo);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(CREATE_ACCOUNT_URL)
                                                             .apiName(CREATE_ACCOUNT_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return executeApiRequest(param);
    }

    public Mono<JsonNode> getDemandDepositAccount(
        String userKey,
        String accountNo
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountNo", accountNo);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_ACCOUNT_URL)
                                                             .apiName(GET_ACCOUNT_API_NAME)
                                                             .requestBody(requestBody)
                                                             .userKey(userKey)
                                                             .build();
        return executeApiRequest(param);
    }

    public Mono<JsonNode> getDemandDepositAccounts(String userKey) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_ACCOUNTS_URL)
                                                             .apiName(GET_ACCOUNTS_API_NAME)
                                                             .requestBody(requestBody)
                                                             .userKey(userKey)
                                                             .build();
        return executeApiRequest(param);
    }

    public Mono<JsonNode> getDemandDepositAccountHolderName(
        String userKey,
        String accountNo
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountNo", accountNo);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_ACCOUNT_HOLDER_URL)
                                                             .apiName(GET_ACCOUNT_HOLDER_API_NAME)
                                                             .requestBody(requestBody)
                                                             .userKey(userKey)
                                                             .build();
        return executeApiRequest(param);
    }

    public Mono<JsonNode> getDemandDepositAccountBalance(
        String userKey,
        String accountNo
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountNo", accountNo);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_BALANCE_URL)
                                                             .apiName(GET_ACCOUNT_BALANCE_API_NAME)
                                                             .requestBody(requestBody)
                                                             .userKey(userKey)
                                                             .build();
        return executeApiRequest(param);
    }

    public Mono<JsonNode> depositDemandDepositAccount(
        String userKey,
        String accountNo,
        Long transactionBalance,
        String transactionSummary
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountNo", accountNo);
        requestBody.put("transactionBalance", transactionBalance);
        requestBody.put("transactionSummary", transactionSummary);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(DEPOSIT_ACCOUNT_DEPOSIT_URL)
                                                             .apiName(DEPOSIT_ACCOUNT_API_NAME)
                                                             .requestBody(requestBody)
                                                             .userKey(userKey)
                                                             .build();
        return executeApiRequest(param);
    }

    public Mono<JsonNode> transferDemandDepositAccount(
        String userKey,
        String depositAccountNo,
        String depositTransactionSummary,
        Long transactionBalance,
        String withdrawalAccountNo,
        String withdrawalTransactionSummary
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("depositAccountNo", depositAccountNo);
        requestBody.put("depositTransactionSummary", depositTransactionSummary);
        requestBody.put("transactionBalance", transactionBalance);
        requestBody.put("withdrawalAccountNo", withdrawalAccountNo);
        requestBody.put("withdrawalTransactionSummary", withdrawalTransactionSummary);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(TRANSFER_ACCOUNT_URL)
                                                             .apiName(TRANSFER_ACCOUNT_API_NAME)
                                                             .requestBody(requestBody)
                                                             .userKey(userKey)
                                                             .build();
        return executeApiRequest(param);
    }

    public Mono<JsonNode> getTransactionHistories(
        String userKey,
        String accountNo,
        String startDate,
        String endDate,
        String transactionType,
        String orderByType
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountNo", accountNo);
        requestBody.put("startDate", startDate);
        requestBody.put("endDate", endDate);
        requestBody.put("transactionType", transactionType);
        requestBody.put("orderByType", orderByType);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_TRANSACTION_HISTORIES_URL)
                                                             .apiName(
                                                                 GET_TRANSACTION_HISTORIES_API_NAME)
                                                             .requestBody(requestBody)
                                                             .userKey(userKey)
                                                             .build();
        return executeApiRequest(param);
    }

    public Mono<JsonNode> getTransactionHistory(
        String userKey,
        String accountNo,
        Long transactionUniqueNo
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountNo", accountNo);
        requestBody.put("transactionUniqueNo", transactionUniqueNo);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_TRANSACTION_HISTORY_URL)
                                                             .apiName(
                                                                 GET_TRANSACTION_HISTORY_API_NAME)
                                                             .requestBody(requestBody)
                                                             .userKey(userKey)
                                                             .build();
        return executeApiRequest(param);
    }
}
