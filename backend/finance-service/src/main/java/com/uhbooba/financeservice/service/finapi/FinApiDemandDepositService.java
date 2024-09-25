package com.uhbooba.financeservice.service.finapi;

import static com.uhbooba.financeservice.util.finapi.FinApiList.DemandDeposit.*;

import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.HandlerParamWithHeader;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositCreateRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositDepositAccountRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositGetTransactionRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositGetTransactionsRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositTransferAccountRequest;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class FinApiDemandDepositService {

    private final FinApiCommonService finApiCommonService;

    /**
     * 수시 입출금 상품 생성
     *
     * @param createRequest
     * @return
     */
    public Mono<JsonNode> createDemandDeposit(
        DemandDepositCreateRequest createRequest
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("bankCode", createRequest.bankCode());
        requestBody.put("accountName", createRequest.accountName());
        requestBody.put("accountDescription", createRequest.accountDescription());

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(CREATE_DEPOSIT_URL)
                                                             .apiName(CREATE_DEPOSIT_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    /**
     * 수시 입출금 상품 조회
     *
     * @return
     */
    public Mono<JsonNode> getDemandDepositProducts() {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_DEPOSIT_URL)
                                                             .apiName(GET_DEPOSIT_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    /**
     * 수시 입출금 계좌 생성
     *
     * @param userKey
     * @param accountTypeUniqueNo
     * @return
     */
    public Mono<JsonNode> createDemandDepositAccount(
        String userKey,
        String accountTypeUniqueNo
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountTypeUniqueNo", accountTypeUniqueNo);

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(CREATE_ACCOUNT_URL)
                                                             .apiName(CREATE_ACCOUNT_API_NAME)
                                                             .requestBody(requestBody)
                                                             .userKey(userKey)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    /**
     * 수시입출금 계좌 조회
     *
     * @param userKey
     * @param accountNo
     * @return
     */
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
        return finApiCommonService.executeApiRequest(param);
    }

    /**
     * 수시 입출금 계좌 전체 조회(사용자의)
     *
     * @param userKey
     * @return
     */
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
        return finApiCommonService.executeApiRequest(param);
    }

    /**
     * 예금주 확인
     *
     * @param userKey
     * @param accountNo
     * @return
     */
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
        return finApiCommonService.executeApiRequest(param);
    }

    /**
     * 잔액 확인
     *
     * @param userKey
     * @param accountNo
     * @return
     */
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
        return finApiCommonService.executeApiRequest(param);
    }

    /**
     * 계좌 입금
     *
     * @param userKey
     * @param depositRequest
     * @return
     */
    public Mono<JsonNode> depositDemandDepositAccount(
        String userKey,
        DemandDepositDepositAccountRequest depositRequest
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountNo", depositRequest.accountNo());
        requestBody.put("transactionBalance", depositRequest.transactionBalance());
        requestBody.put("transactionSummary", depositRequest.transactionSummary());

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(DEPOSIT_ACCOUNT_DEPOSIT_URL)
                                                             .apiName(DEPOSIT_ACCOUNT_API_NAME)
                                                             .requestBody(requestBody)
                                                             .userKey(userKey)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    /**
     * 계좌 이체
     *
     * @param userKey
     * @param transferAccountRequest
     * @return
     */
    public Mono<JsonNode> transferDemandDepositAccount(
        String userKey,
        DemandDepositTransferAccountRequest transferAccountRequest
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("depositAccountNo", transferAccountRequest.depositAccountNo());
        requestBody.put("depositTransactionSummary",
                        transferAccountRequest.depositTransactionSummary());
        requestBody.put("transactionBalance", transferAccountRequest.transactionBalance());
        requestBody.put("withdrawalAccountNo", transferAccountRequest.withdrawalAccountNo());
        requestBody.put("withdrawalTransactionSummary",
                        transferAccountRequest.withdrawalTransactionSummary());

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(TRANSFER_ACCOUNT_URL)
                                                             .apiName(TRANSFER_ACCOUNT_API_NAME)
                                                             .requestBody(requestBody)
                                                             .userKey(userKey)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    /**
     * 거래 내역 조회
     *
     * @param userKey
     * @param getTransactionRequest
     * @return
     */
    public Mono<JsonNode> getTransactionHistories(
        String userKey,
        DemandDepositGetTransactionsRequest getTransactionRequest
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountNo", getTransactionRequest.accountNo());
        requestBody.put("startDate", getTransactionRequest.startDate());
        requestBody.put("endDate", getTransactionRequest.endDate());
        requestBody.put("transactionType", getTransactionRequest.transactionType());
        requestBody.put("orderByType", getTransactionRequest.orderByType());

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_TRANSACTION_HISTORIES_URL)
                                                             .apiName(
                                                                 GET_TRANSACTION_HISTORIES_API_NAME)
                                                             .requestBody(requestBody)
                                                             .userKey(userKey)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }

    /**
     * 거래 내역 단건 조회
     *
     * @param userKey
     * @param getTransactionRequest
     * @return
     */
    public Mono<JsonNode> getTransactionHistory(
        String userKey,
        DemandDepositGetTransactionRequest getTransactionRequest
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountNo", getTransactionRequest.accountNo());
        requestBody.put("transactionUniqueNo", getTransactionRequest.transactionUniqueNo());

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_TRANSACTION_HISTORY_URL)
                                                             .apiName(
                                                                 GET_TRANSACTION_HISTORY_API_NAME)
                                                             .requestBody(requestBody)
                                                             .userKey(userKey)
                                                             .build();
        return finApiCommonService.executeApiRequest(param);
    }
}
