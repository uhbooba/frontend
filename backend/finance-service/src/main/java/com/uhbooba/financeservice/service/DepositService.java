package com.uhbooba.financeservice.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.request.deposit.DepositAccountCreateRequest;
import com.uhbooba.financeservice.dto.finapi.request.deposit.DepositCreateRequest;
import com.uhbooba.financeservice.dto.finapi.response.deposit.DepositAccountDeleteResponse;
import com.uhbooba.financeservice.dto.finapi.response.deposit.DepositAccountResponse;
import com.uhbooba.financeservice.dto.finapi.response.deposit.DepositEarlyTerminationInterestResponse;
import com.uhbooba.financeservice.dto.finapi.response.deposit.DepositExpiryInterestResponse;
import com.uhbooba.financeservice.dto.finapi.response.deposit.DepositResponse;
import com.uhbooba.financeservice.service.finapi.FinApiDepositService;
import com.uhbooba.financeservice.util.JsonToDtoConverter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class DepositService {

    private final FinApiDepositService finApiDepositService;
    private final JsonToDtoConverter jsonToDtoConverter;

    public DepositResponse createDeposit(
        DepositCreateRequest dto
    ) {
        JsonNode createdDeposit = finApiDepositService.createDeposit(dto)
                                                      .block();
        return jsonToDtoConverter.convertToObject(createdDeposit, DepositResponse.class);
    }

    public List<DepositResponse> getAllDeposits() {
        JsonNode deposits = finApiDepositService.getDepositProducts()
                                                .block();
        return jsonToDtoConverter.convertToList(deposits,
                                                new TypeReference<List<DepositResponse>>() {});
    }

    public DepositAccountResponse createDepositAccount(
        String userKey,
        DepositAccountCreateRequest dto
    ) {
        JsonNode createdDeposit = finApiDepositService.createDepositAccount(userKey, dto)
                                                      .block();
        return jsonToDtoConverter.convertToObject(createdDeposit, DepositAccountResponse.class);
    }

    public DepositAccountResponse getDepositAccount(
        String userKey,
        String accountNo
    ) {
        JsonNode depositAccount = finApiDepositService.getDepositAccount(userKey, accountNo)
                                                      .block();
        return jsonToDtoConverter.convertToObject(depositAccount, DepositAccountResponse.class);
    }

    public List<DepositAccountResponse> getAllDepositAccounts(
        String userKey
    ) {
        JsonNode depositAccounts = finApiDepositService.getDepositAccounts(userKey)
                                                       .block();
        return jsonToDtoConverter.convertToList(depositAccounts,
                                                new TypeReference<List<DepositAccountResponse>>() {});
    }

    public DepositExpiryInterestResponse getDepositExpiryInterest(
        String userKey,
        String accountNo
    ) {
        JsonNode depositExpiryInterest = finApiDepositService.getDepositExpiryInterest(userKey,
                                                                                       accountNo)
                                                             .block();
        return jsonToDtoConverter.convertToObject(depositExpiryInterest,
                                                  DepositExpiryInterestResponse.class);
    }

    public DepositEarlyTerminationInterestResponse getDepositEarlyTerminationInterest(
        String userKey,
        String accountNo
    ) {
        JsonNode nodeMono = finApiDepositService.getDepositEarlyTerminationInterest(userKey,
                                                                                    accountNo)
                                                .block();
        return jsonToDtoConverter.convertToObject(nodeMono,
                                                  DepositEarlyTerminationInterestResponse.class);
    }

    public DepositAccountDeleteResponse deleteDepositAccount(
        String userKey,
        String accountNo
    ) {
        JsonNode deletedDeposit = finApiDepositService.deleteDepositAccount(userKey, accountNo)
                                                      .block();
        return jsonToDtoConverter.convertToObject(deletedDeposit,
                                                  DepositAccountDeleteResponse.class);
    }
}
