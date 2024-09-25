package com.uhbooba.financeservice.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositCreateRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositDepositAccountRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositGetTransactionRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositGetTransactionsRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositTransferAccountRequest;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositAccountBalanceResponse;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositAccountHolderResponse;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositAccountResponse;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositDepositResponse;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositResponse;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositTransferResponse;
import com.uhbooba.financeservice.dto.finapi.response.transaction.TransactionListResponse;
import com.uhbooba.financeservice.dto.finapi.response.transaction.TransactionResponse;
import com.uhbooba.financeservice.entity.UserAccount;
import com.uhbooba.financeservice.service.finapi.FinApiDemandDepositService;
import com.uhbooba.financeservice.util.JsonToDtoConverter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class DemandDepositService {

    @Value("${variables.bank-code}")
    private String bankCode;

    @Value("${variables.demand-deposit-product-id}")
    private String demandDepositProductId;

    private final UserAccountService userAccountService;

    private final FinApiDemandDepositService finApiDemandDepositService;
    private final JsonToDtoConverter jsonToDtoConverter;

    public DemandDepositResponse createDemandDeposit(
        DemandDepositCreateRequest demandDepositCreateRequest
    ) {
        JsonNode createdDemandDeposit = finApiDemandDepositService.createDemandDeposit(
                                                                      demandDepositCreateRequest)
                                                                  .block();
        return jsonToDtoConverter.convertToObject(createdDemandDeposit,
                                                  DemandDepositResponse.class);
    }

    public List<DemandDepositResponse> getAllDemandDeposits() {
        JsonNode demandDeposits = finApiDemandDepositService.getDemandDepositProducts()
                                                            .block();
        return jsonToDtoConverter.convertToList(demandDeposits,
                                                new TypeReference<List<DemandDepositResponse>>() {});
    }

    public DemandDepositAccountResponse createDemandDepositAccount(
        Integer userId
    ) {
        // 1. 사용자 계정 찾기
        UserAccount userAccount = userAccountService.getUserAccountByUserId(userId);
        String userKey = userAccount.getUserKey();
        String accountTypeUniqueNo = demandDepositProductId;
        // 2. 입출금 계좌 만들기 (동기적 처리)

        // 비동기 API 호출 후 block()으로 동기 처리
        JsonNode createdDemandDeposit = finApiDemandDepositService.createDemandDepositAccount(
                                                                      userKey, accountTypeUniqueNo)
                                                                  .block();

        // JSON을 객체로 변환 후 반환
        DemandDepositAccountResponse demandDepositAccount = jsonToDtoConverter.convertToObject(
            createdDemandDeposit, DemandDepositAccountResponse.class);

        return demandDepositAccount;  // 최종 결과 반환
    }

    public DemandDepositAccountResponse getDemandDepositAccount(
        String userKey,
        String accountNo
    ) {
        JsonNode demandDeposit = finApiDemandDepositService.getDemandDepositAccount(userKey,
                                                                                    accountNo)
                                                           .block();
        return jsonToDtoConverter.convertToObject(demandDeposit,
                                                  DemandDepositAccountResponse.class);
    }

    public List<DemandDepositResponse> getAllDemandDepositAccounts(
        String userKey
    ) {
        JsonNode demandDeposits = finApiDemandDepositService.getDemandDepositAccounts(userKey)
                                                            .block();
        return jsonToDtoConverter.convertToList(demandDeposits,
                                                new TypeReference<List<DemandDepositResponse>>() {});
    }

    public DemandDepositAccountHolderResponse getDemandDepositAccountHolderName(
        String userKey,
        String accountNo
    ) {
        JsonNode holder = finApiDemandDepositService.getDemandDepositAccountHolderName(userKey,
                                                                                       accountNo)
                                                    .block();
        return jsonToDtoConverter.convertToObject(holder, DemandDepositAccountHolderResponse.class);
    }

    public DemandDepositAccountBalanceResponse getDemandDepositAccountBalance(
        String userKey,
        String accountNo
    ) {
        JsonNode balance = finApiDemandDepositService.getDemandDepositAccountBalance(userKey,
                                                                                     accountNo)
                                                     .block();
        return jsonToDtoConverter.convertToObject(balance,
                                                  DemandDepositAccountBalanceResponse.class);
    }

    public DemandDepositDepositResponse depositDemandDepositAccount(
        String userKey,
        DemandDepositDepositAccountRequest depositRequest
    ) {
        JsonNode deposit = finApiDemandDepositService.depositDemandDepositAccount(userKey,
                                                                                  depositRequest)
                                                     .block();
        return jsonToDtoConverter.convertToObject(deposit, DemandDepositDepositResponse.class);
    }

    public List<DemandDepositTransferResponse> transferDemandDepositAccount(
        String userKey,
        DemandDepositTransferAccountRequest transferAccountRequest
    ) {
        JsonNode transfer = finApiDemandDepositService.transferDemandDepositAccount(userKey,
                                                                                    transferAccountRequest)
                                                      .block();
        return jsonToDtoConverter.convertToList(transfer,
                                                new TypeReference<List<DemandDepositTransferResponse>>() {});
    }

    public TransactionListResponse getTransactionHistories(
        String userKey,
        DemandDepositGetTransactionsRequest getTransactionRequest
    ) {
        JsonNode transactions = finApiDemandDepositService.getTransactionHistories(userKey,
                                                                                   getTransactionRequest)
                                                          .block();
        return jsonToDtoConverter.convertToObject(transactions, TransactionListResponse.class);
    }

    public TransactionResponse getTransactionHistory(
        String userKey,
        DemandDepositGetTransactionRequest getTransactionRequest
    ) {
        JsonNode transaction = finApiDemandDepositService.getTransactionHistory(userKey,
                                                                                getTransactionRequest)
                                                         .block();
        return jsonToDtoConverter.convertToObject(transaction, TransactionResponse.class);
    }

}
