package com.uhbooba.financeservice.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.deposit.DepositAccountCreateRequest;
import com.uhbooba.financeservice.dto.finapi.deposit.DepositCreateRequest;
import com.uhbooba.financeservice.dto.response.deposit.DepositAccountDeleteResponse;
import com.uhbooba.financeservice.dto.response.deposit.DepositAccountResponse;
import com.uhbooba.financeservice.dto.response.deposit.DepositEarlyTerminationInterestResponse;
import com.uhbooba.financeservice.dto.response.deposit.DepositExpiryInterestResponse;
import com.uhbooba.financeservice.dto.response.deposit.DepositResponse;
import com.uhbooba.financeservice.service.finapi.FinApiDepositService;
import com.uhbooba.financeservice.util.JsonToDtoConverter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class DepositService {

    private final FinApiDepositService finApiDepositService;
    private final JsonToDtoConverter jsonToDtoConverter;

    public Mono<DepositResponse> createDeposit(
        DepositCreateRequest dto
    ) {
        Mono<JsonNode> createdDeposit = finApiDepositService.createDeposit(dto);
        return jsonToDtoConverter.convertToObject(createdDeposit, DepositResponse.class);
    }

    public Mono<List<DepositResponse>> getAllDeposits() {
        Mono<JsonNode> deposits = finApiDepositService.getDepositProducts();
        return jsonToDtoConverter.convertToList(deposits,
                                                new TypeReference<List<DepositResponse>>() {});
    }

    public Mono<DepositAccountResponse> createDepositAccount(
        String userKey,
        DepositAccountCreateRequest dto
    ) {
        Mono<JsonNode> createdDeposit = finApiDepositService.createDepositAccount(userKey, dto);
        return jsonToDtoConverter.convertToObject(createdDeposit, DepositAccountResponse.class);
    }

    public Mono<DepositAccountResponse> getDepositAccount(
        String userKey,
        String accountNo
    ) {
        Mono<JsonNode> depositAccount = finApiDepositService.getDepositAccount(userKey, accountNo);
        return jsonToDtoConverter.convertToObject(depositAccount, DepositAccountResponse.class);
    }

    public Mono<List<DepositAccountResponse>> getAllDepositAccounts(
        String userKey
    ) {
        Mono<JsonNode> depositAccounts = finApiDepositService.getDepositAccounts(userKey);
        return jsonToDtoConverter.convertToList(depositAccounts,
                                                new TypeReference<List<DepositAccountResponse>>() {});
    }

    public Mono<DepositExpiryInterestResponse> getDepositExpiryInterest(
        String userKey,
        String accountNo
    ) {
        Mono<JsonNode> depositExpiryInterest = finApiDepositService.getDepositExpiryInterest(
            userKey, accountNo);
        return jsonToDtoConverter.convertToObject(depositExpiryInterest,
                                                  DepositExpiryInterestResponse.class);
    }

    public Mono<DepositEarlyTerminationInterestResponse> getDepositEarlyTerminationInterest(
        String userKey,
        String accountNo
    ) {
        Mono<JsonNode> nodeMono = finApiDepositService.getDepositEarlyTerminationInterest(userKey,
                                                                                          accountNo);
        return jsonToDtoConverter.convertToObject(nodeMono,
                                                  DepositEarlyTerminationInterestResponse.class);
    }

    public Mono<DepositAccountDeleteResponse> deleteDepositAccount(
        String userKey,
        String accountNo
    ) {
        Mono<JsonNode> deletedDeposit = finApiDepositService.deleteDepositAccount(userKey,
                                                                                  accountNo);
        return jsonToDtoConverter.convertToObject(deletedDeposit,
                                                  DepositAccountDeleteResponse.class);
    }
}
