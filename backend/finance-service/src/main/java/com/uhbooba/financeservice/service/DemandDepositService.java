package com.uhbooba.financeservice.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.demand_deposit.DemandDepositCreateRequest;
import com.uhbooba.financeservice.dto.finapi.demand_deposit.DemandDepositDepositAccountRequest;
import com.uhbooba.financeservice.dto.finapi.demand_deposit.DemandDepositGetTransactionRequest;
import com.uhbooba.financeservice.dto.finapi.demand_deposit.DemandDepositGetTransactionsRequest;
import com.uhbooba.financeservice.dto.finapi.demand_deposit.DemandDepositTransferAccountRequest;
import com.uhbooba.financeservice.dto.response.demand_deposit.DemandDepositAccountBalanceResponse;
import com.uhbooba.financeservice.dto.response.demand_deposit.DemandDepositAccountHolderResponse;
import com.uhbooba.financeservice.dto.response.demand_deposit.DemandDepositAccountResponse;
import com.uhbooba.financeservice.dto.response.demand_deposit.DemandDepositDepositResponse;
import com.uhbooba.financeservice.dto.response.demand_deposit.DemandDepositResponse;
import com.uhbooba.financeservice.dto.response.demand_deposit.DemandDepositTransferResponse;
import com.uhbooba.financeservice.dto.response.transaction.TransactionListResponse;
import com.uhbooba.financeservice.dto.response.transaction.TransactionResponse;
import com.uhbooba.financeservice.service.finapi.FinApiDemandDepositService;
import com.uhbooba.financeservice.util.JsonToDtoConverter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class DemandDepositService {

    private final FinApiDemandDepositService finApiDemandDepositService;
    private final JsonToDtoConverter jsonToDtoConverter;

    public Mono<DemandDepositResponse> createDemandDeposit(
        DemandDepositCreateRequest demandDepositCreateRequest
    ) {
        Mono<JsonNode> createdDemandDeposit = finApiDemandDepositService.createDemandDeposit(
            demandDepositCreateRequest);
        return jsonToDtoConverter.convertToObject(createdDemandDeposit,
                                                  DemandDepositResponse.class);
    }

    public Mono<List<DemandDepositResponse>> getAllDemandDeposits() {
        Mono<JsonNode> demandDeposits = finApiDemandDepositService.getDemandDepositProducts();
        return jsonToDtoConverter.convertToList(demandDeposits,
                                                new TypeReference<List<DemandDepositResponse>>() {});
    }

    public Mono<DemandDepositAccountResponse> createDemandDepositAccount(
        String userKey,
        String accountTypeUniqueNo
    ) {
        Mono<JsonNode> createdDemandDeposit = finApiDemandDepositService.createDemandDepositAccount(
            userKey, accountTypeUniqueNo);
        return jsonToDtoConverter.convertToObject(createdDemandDeposit,
                                                  DemandDepositAccountResponse.class);
    }

    public Mono<DemandDepositAccountResponse> getDemandDepositAccount(
        String userKey,
        String accountNo
    ) {
        Mono<JsonNode> demandDeposit = finApiDemandDepositService.getDemandDepositAccount(userKey,
                                                                                          accountNo);
        return jsonToDtoConverter.convertToObject(demandDeposit,
                                                  DemandDepositAccountResponse.class);
    }

    public Mono<List<DemandDepositResponse>> getAllDemandDepositAccounts(
        String userKey
    ) {
        Mono<JsonNode> demandDeposits = finApiDemandDepositService.getDemandDepositAccounts(
            userKey);
        return jsonToDtoConverter.convertToList(demandDeposits,
                                                new TypeReference<List<DemandDepositResponse>>() {});
    }

    public Mono<DemandDepositAccountHolderResponse> getDemandDepositAccountHolderName(
        String userKey,
        String accountNo
    ) {
        Mono<JsonNode> holder = finApiDemandDepositService.getDemandDepositAccountHolderName(
            userKey, accountNo);
        return jsonToDtoConverter.convertToObject(holder, DemandDepositAccountHolderResponse.class);
    }

    public Mono<DemandDepositAccountBalanceResponse> getDemandDepositAccountBalance(
        String userKey,
        String accountNo
    ) {
        Mono<JsonNode> balance = finApiDemandDepositService.getDemandDepositAccountBalance(userKey,
                                                                                           accountNo);
        return jsonToDtoConverter.convertToObject(balance,
                                                  DemandDepositAccountBalanceResponse.class);
    }

    public Mono<DemandDepositDepositResponse> depositDemandDepositAccount(
        String userKey,
        DemandDepositDepositAccountRequest depositRequest
    ) {
        Mono<JsonNode> deposit = finApiDemandDepositService.depositDemandDepositAccount(userKey,
                                                                                        depositRequest);
        return jsonToDtoConverter.convertToObject(deposit, DemandDepositDepositResponse.class);
    }

    public Mono<List<DemandDepositTransferResponse>> transferDemandDepositAccount(
        String userKey,
        DemandDepositTransferAccountRequest transferAccountRequest
    ) {
        Mono<JsonNode> transfer = finApiDemandDepositService.transferDemandDepositAccount(userKey,
                                                                                          transferAccountRequest);
        return jsonToDtoConverter.convertToList(transfer,
                                                new TypeReference<List<DemandDepositTransferResponse>>() {});
    }

    public Mono<TransactionListResponse> getTransactionHistories(
        String userKey,
        DemandDepositGetTransactionsRequest getTransactionRequest
    ) {
        Mono<JsonNode> transactions = finApiDemandDepositService.getTransactionHistories(userKey,
                                                                                         getTransactionRequest);
        return jsonToDtoConverter.convertToObject(transactions, TransactionListResponse.class);
    }

    public Mono<TransactionResponse> getTransactionHistory(
        String userKey,
        DemandDepositGetTransactionRequest getTransactionRequest
    ) {
        Mono<JsonNode> transaction = finApiDemandDepositService.getTransactionHistory(userKey,
                                                                                      getTransactionRequest);
        return jsonToDtoConverter.convertToObject(transaction, TransactionResponse.class);
    }

}
