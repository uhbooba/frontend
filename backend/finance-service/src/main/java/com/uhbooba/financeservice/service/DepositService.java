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
import com.uhbooba.financeservice.entity.DepositProduct;
import com.uhbooba.financeservice.entity.UserAccount;
import com.uhbooba.financeservice.mapper.DepositProductMapper;
import com.uhbooba.financeservice.repository.DepositProductRepository;
import com.uhbooba.financeservice.service.finapi.FinApiDepositService;
import com.uhbooba.financeservice.util.JsonToDtoConverter;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class DepositService {

    private final FinApiDepositService finApiDepositService;
    private final UserAccountService userAccountService;

    private final JsonToDtoConverter jsonToDtoConverter;

    private final DepositProductRepository depositProductRepository;

    private final DepositProductMapper depositProductMapper;

    @Transactional
    public DepositResponse createDeposit(
        DepositCreateRequest dto
    ) {
        JsonNode createdDeposit = finApiDepositService.createDeposit(dto)
                                                      .block();

        DepositResponse depositResponse = jsonToDtoConverter.convertToObject(createdDeposit,
                                                                             DepositResponse.class);

        Set<String> interestRates = new HashSet<>(Arrays.asList("1.0", "3.0", "5.0"));

        if(interestRates.contains(depositResponse.interestRate())) {
            DepositProduct deposit = depositProductMapper.toEntity(depositResponse);
            depositProductRepository.save(deposit);
        }

        return depositResponse;
    }

    public List<DepositResponse> getAllDepositsByApi() {
        JsonNode deposits = finApiDepositService.getDepositProducts()
                                                .block();
        return jsonToDtoConverter.convertToList(deposits,
                                                new TypeReference<List<DepositResponse>>() {});
    }

    public List<DepositResponse> getAllDeposits() {
        List<DepositProduct> depositProducts = depositProductRepository.findAll();
        return depositProductMapper.toDto(depositProducts);
    }

    public DepositAccountResponse createDepositAccount(
        Integer userId,
        DepositAccountCreateRequest dto
    ) {
        // 1. 사용자 계정 찾기
        UserAccount userAccount = userAccountService.getUserAccountByUserId(userId);
        JsonNode createdDeposit = finApiDepositService.createDepositAccount(userKey, dto)
                                                      .block();
        return jsonToDtoConverter.convertToObject(createdDeposit, DepositAccountResponse.class);
    }

    public DepositAccountResponse getDepositAccount(
        Integer userId,
        String accountNo
    ) {
        JsonNode depositAccount = finApiDepositService.getDepositAccount(userKey, accountNo)
                                                      .block();
        return jsonToDtoConverter.convertToObject(depositAccount, DepositAccountResponse.class);
    }

    public List<DepositAccountResponse> getAllDepositAccounts(
        Integer userId
    ) {
        JsonNode depositAccounts = finApiDepositService.getDepositAccounts(userKey)
                                                       .block();
        return jsonToDtoConverter.convertToList(depositAccounts,
                                                new TypeReference<List<DepositAccountResponse>>() {});
    }

    public DepositExpiryInterestResponse getDepositExpiryInterest(
        Integer userId,
        String accountNo
    ) {
        JsonNode depositExpiryInterest = finApiDepositService.getDepositExpiryInterest(userKey,
                                                                                       accountNo)
                                                             .block();
        return jsonToDtoConverter.convertToObject(depositExpiryInterest,
                                                  DepositExpiryInterestResponse.class);
    }

    public DepositEarlyTerminationInterestResponse getDepositEarlyTerminationInterest(
        Integer userId,
        String accountNo
    ) {
        JsonNode nodeMono = finApiDepositService.getDepositEarlyTerminationInterest(userKey,
                                                                                    accountNo)
                                                .block();
        return jsonToDtoConverter.convertToObject(nodeMono,
                                                  DepositEarlyTerminationInterestResponse.class);
    }

    public DepositAccountDeleteResponse deleteDepositAccount(
        Integer userId,
        String accountNo
    ) {
        JsonNode deletedDeposit = finApiDepositService.deleteDepositAccount(userKey, accountNo)
                                                      .block();
        return jsonToDtoConverter.convertToObject(deletedDeposit,
                                                  DepositAccountDeleteResponse.class);
    }
}
