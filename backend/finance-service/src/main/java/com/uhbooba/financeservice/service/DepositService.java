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
import com.uhbooba.financeservice.dto.request.TransactionUpdateRequest;
import com.uhbooba.financeservice.dto.response.TransactionTransferResponse;
import com.uhbooba.financeservice.entity.Account;
import com.uhbooba.financeservice.entity.DepositProduct;
import com.uhbooba.financeservice.entity.UserAccount;
import com.uhbooba.financeservice.exception.DepositFailedException;
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

    private final static Set<String> interestRates = new HashSet<>(
        Arrays.asList("7.0", "10.0", "12.0"));

    private final FinApiDepositService finApiDepositService;
    private final UserAccountService userAccountService;
    private final AccountService accountService;
    private final TransactionService transactionService;

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
        // 예금 상품 (1.0%, 3.0%, 5.0%)저장
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

    /**
     * DB 에 있는 예금 상품 가져오기(예금 상품 세개만 사용할 예정이기 때문)
     *
     * @return
     */
    @Transactional(readOnly = true)
    public List<DepositResponse> getAllDeposits() {
        List<DepositProduct> depositProducts = depositProductRepository.findAll();
        return depositProductMapper.toDto(depositProducts);
    }

    @Transactional
    public DepositAccountResponse createDepositAccount(
        Integer userId,
        DepositAccountCreateRequest dto
    ) {
        // 1. 사용자 계정 찾기
        UserAccount userAccount = getUserAccountByUserId(userId);
        String userKey = userAccount.getUserKey();

        Account sourceAccount = accountService.findByAccountNo(dto.withdrawalAccountNo());

        // transaction 생성
        TransactionTransferResponse transactionRequests = transactionService.createTransactionRequest(
            dto, sourceAccount);

        try {
            JsonNode createdDeposit = finApiDepositService.createDepositAccount(userKey, dto)
                                                          .block();

            DepositAccountResponse depositAccountResponse = jsonToDtoConverter.convertToObject(
                createdDeposit, DepositAccountResponse.class);

            // 2. 예금 계좌 저장하기
            Account account = accountService.createAccount(depositAccountResponse, userAccount);

            // 기존 입출금 계좌에 대한 transaction 처리(transaction unique no 가 없음)
            transactionService.updateTransactionForSuccess(transactionRequests.senderTransaction(),
                                                           TransactionUpdateRequest.builder()
                                                                                   .build());
            // 예금 계좌에 대한 transaction 처리
            transactionService.updateTransactionForSuccess(
                transactionRequests.receiverTransaction(), TransactionUpdateRequest.builder()
                                                                                   .account(account)
                                                                                   .build());

            return depositAccountResponse;
        } catch(Exception ex) {
            // 트랜잭션 실패 처리
            transactionService.updateTransactionForFail(transactionRequests.receiverTransaction(),
                                                        ex);
            transactionService.updateTransactionForFail(transactionRequests.senderTransaction(),
                                                        ex);
            throw new DepositFailedException("예금 가입을 실패했습니다.");
        }
    }

    private UserAccount getUserAccountByUserId(Integer userId) {
        return userAccountService.getUserAccountByUserId(userId);
    }

    private String getUserKey(Integer userId) {
        return userAccountService.getUserAccountByUserId(userId)
                                 .getUserKey();
    }

    public DepositAccountResponse getDepositAccount(
        Integer userId,
        String accountNo
    ) {
        // 1. 사용자 계정 찾기
        String userKey = getUserKey(userId);
        JsonNode depositAccount = finApiDepositService.getDepositAccount(userKey, accountNo)
                                                      .block();
        return jsonToDtoConverter.convertToObject(depositAccount, DepositAccountResponse.class);
    }

    public List<DepositAccountResponse> getAllDepositAccounts(
        Integer userId
    ) {
        // 1. 사용자 계정 찾기
        String userKey = getUserKey(userId);
        JsonNode depositAccounts = finApiDepositService.getDepositAccounts(userKey)
                                                       .block();
        return jsonToDtoConverter.convertToList(depositAccounts.get("list"),
                                                new TypeReference<List<DepositAccountResponse>>() {});
    }

    public DepositExpiryInterestResponse getDepositExpiryInterest(
        Integer userId,
        String accountNo
    ) {
        // 1. 사용자 계정 찾기
        String userKey = getUserKey(userId);
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
        // 1. 사용자 계정 찾기
        String userKey = getUserKey(userId);
        JsonNode nodeMono = finApiDepositService.getDepositEarlyTerminationInterest(userKey,
                                                                                    accountNo)
                                                .block();
        return jsonToDtoConverter.convertToObject(nodeMono,
                                                  DepositEarlyTerminationInterestResponse.class);
    }

    @Transactional
    public DepositAccountDeleteResponse deleteDepositAccount(
        Integer userId,
        String accountNo
    ) {
        // 1. 사용자 계정 찾기
        UserAccount userAccount = getUserAccountByUserId(userId);
        String userKey = userAccount.getUserKey();

        // 2. 삭제하기
        JsonNode deletedDeposit = finApiDepositService.deleteDepositAccount(userKey, accountNo)
                                                      .block();
        // 3. db 내에도 삭제하기
        accountService.deleteAccount(accountNo);

        return jsonToDtoConverter.convertToObject(deletedDeposit,
                                                  DepositAccountDeleteResponse.class);
    }
}
