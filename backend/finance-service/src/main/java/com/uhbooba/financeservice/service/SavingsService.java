package com.uhbooba.financeservice.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.request.savings.SavingsAccountCreateRequest;
import com.uhbooba.financeservice.dto.finapi.request.savings.SavingsCreateRequest;
import com.uhbooba.financeservice.dto.finapi.response.savings.SavingsAccountDeleteResponse;
import com.uhbooba.financeservice.dto.finapi.response.savings.SavingsAccountResponse;
import com.uhbooba.financeservice.dto.finapi.response.savings.SavingsEarlyTerminationInterestResponse;
import com.uhbooba.financeservice.dto.finapi.response.savings.SavingsExpiryInterestResponse;
import com.uhbooba.financeservice.dto.finapi.response.savings.SavingsResponse;
import com.uhbooba.financeservice.entity.Account;
import com.uhbooba.financeservice.entity.AccountType;
import com.uhbooba.financeservice.entity.SavingsProduct;
import com.uhbooba.financeservice.entity.UserAccount;
import com.uhbooba.financeservice.mapper.AccountMapper;
import com.uhbooba.financeservice.mapper.SavingsProductMapper;
import com.uhbooba.financeservice.repository.AccountRepository;
import com.uhbooba.financeservice.repository.SavingsProductRepository;
import com.uhbooba.financeservice.service.finapi.FinApiSavingsService;
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
public class SavingsService {

    private final static Set<String> interestRates = new HashSet<>(
        Arrays.asList("1.0", "3.0", "5.0"));

    private final FinApiSavingsService finApiSavingsService;
    private final UserAccountService userAccountService;

    private final JsonToDtoConverter jsonToDtoConverter;

    private final SavingsProductRepository savingsProductRepository;

    private final SavingsProductMapper savingsProductMapper;
    private final AccountMapper accountMapper;
    private final AccountRepository accountRepository;

    @Transactional
    public SavingsResponse createSavings(
        SavingsCreateRequest dto
    ) {
        JsonNode createdSavings = finApiSavingsService.createSavings(dto)
                                                      .block();

        SavingsResponse savingsResponse = jsonToDtoConverter.convertToObject(createdSavings,
                                                                             SavingsResponse.class);
        // 적금 상품 (1.0%, 3.0%, 5.0%)저장
        if(interestRates.contains(savingsResponse.interestRate())) {
            SavingsProduct savings = savingsProductMapper.toEntity(savingsResponse);
            savingsProductRepository.save(savings);
        }

        return savingsResponse;
    }

    public List<SavingsResponse> getAllSavingsByApi() {
        JsonNode savingss = finApiSavingsService.getSavingsProducts()
                                                .block();
        return jsonToDtoConverter.convertToList(savingss,
                                                new TypeReference<List<SavingsResponse>>() {});
    }

    /**
     * DB 에 있는 적금 상품 가져오기(적금 상품 세개만 사용할 예정이기 때문)
     *
     * @return
     */
    public List<SavingsResponse> getAllSavings() {
        List<SavingsProduct> savingsProducts = savingsProductRepository.findAll();
        return savingsProductMapper.toDto(savingsProducts);
    }

    public SavingsAccountResponse createSavingsAccount(
        Integer userId,
        SavingsAccountCreateRequest dto
    ) {
        // 1. 사용자 계정 찾기
        UserAccount userAccount = getUserAccountByUserId(userId);
        String userKey = userAccount.getUserKey();

        JsonNode createdSavings = finApiSavingsService.createSavingsAccount(userKey, dto)
                                                      .block();

        SavingsAccountResponse savingsAccountResponse = jsonToDtoConverter.convertToObject(
            createdSavings, SavingsAccountResponse.class);

        // 2. 적금 계좌 저장하기
        Account account = accountMapper.toEntity(savingsAccountResponse);
        account.setUserAccount(userAccount);
        account.setAccountTypeCode(AccountType.INSTALLMENT_SAVING);
        account.setAccountTypeName("적금");

        accountRepository.save(account);

        return savingsAccountResponse;
    }

    private UserAccount getUserAccountByUserId(Integer userId) {
        return userAccountService.getUserAccountByUserId(userId);
    }

    private String getUserKey(Integer userId) {
        return userAccountService.getUserAccountByUserId(userId)
                                 .getUserKey();
    }

    public SavingsAccountResponse getSavingsAccount(
        Integer userId,
        String accountNo
    ) {
        // 1. 사용자 계정 찾기
        String userKey = getUserKey(userId);
        JsonNode savingsAccount = finApiSavingsService.getSavingsAccount(userKey, accountNo)
                                                      .block();
        return jsonToDtoConverter.convertToObject(savingsAccount, SavingsAccountResponse.class);
    }

    public List<SavingsAccountResponse> getAllSavingsAccounts(
        Integer userId
    ) {
        // 1. 사용자 계정 찾기
        String userKey = getUserKey(userId);
        JsonNode savingsAccounts = finApiSavingsService.getSavingsAccounts(userKey)
                                                       .block();
        return jsonToDtoConverter.convertToList(savingsAccounts.get("list"),
                                                new TypeReference<List<SavingsAccountResponse>>() {});
    }

    public SavingsExpiryInterestResponse getSavingsExpiryInterest(
        Integer userId,
        String accountNo
    ) {
        // 1. 사용자 계정 찾기
        String userKey = getUserKey(userId);
        JsonNode savingsExpiryInterest = finApiSavingsService.getSavingsExpiryInterest(userKey,
                                                                                       accountNo)
                                                             .block();
        return jsonToDtoConverter.convertToObject(savingsExpiryInterest,
                                                  SavingsExpiryInterestResponse.class);
    }

    public SavingsEarlyTerminationInterestResponse getSavingsEarlyTerminationInterest(
        Integer userId,
        String accountNo
    ) {
        // 1. 사용자 계정 찾기
        String userKey = getUserKey(userId);
        JsonNode nodeMono = finApiSavingsService.getSavingsEarlyTerminationInterest(userKey,
                                                                                    accountNo)
                                                .block();
        return jsonToDtoConverter.convertToObject(nodeMono,
                                                  SavingsEarlyTerminationInterestResponse.class);
    }

    @Transactional
    public SavingsAccountDeleteResponse deleteSavingsAccount(
        Integer userId,
        String accountNo
    ) {
        // 1. 사용자 계정 찾기
        UserAccount userAccount = getUserAccountByUserId(userId);
        String userKey = userAccount.getUserKey();

        // 2. 삭제하기
        JsonNode deletedSavings = finApiSavingsService.deleteSavingsAccount(userKey, accountNo)
                                                      .block();
        // 3. db 내에도 삭제하기
        Account accountToDelete = accountRepository.findByAccountNo(accountNo);
        accountRepository.delete(accountToDelete);

        return jsonToDtoConverter.convertToObject(deletedSavings,
                                                  SavingsAccountDeleteResponse.class);
    }
}
