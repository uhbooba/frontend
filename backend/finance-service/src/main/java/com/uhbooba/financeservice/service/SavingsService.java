package com.uhbooba.financeservice.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.UserHeaderInfo;
import com.uhbooba.financeservice.dto.finapi.request.savings.SavingsAccountCreateRequest;
import com.uhbooba.financeservice.dto.finapi.request.savings.SavingsCreateRequest;
import com.uhbooba.financeservice.dto.finapi.response.savings.SavingsAccountDeleteResponse;
import com.uhbooba.financeservice.dto.finapi.response.savings.SavingsAccountResponse;
import com.uhbooba.financeservice.dto.finapi.response.savings.SavingsEarlyTerminationInterestResponse;
import com.uhbooba.financeservice.dto.finapi.response.savings.SavingsExpiryInterestResponse;
import com.uhbooba.financeservice.dto.finapi.response.savings.SavingsResponse;
import com.uhbooba.financeservice.dto.request.TransactionUpdateRequest;
import com.uhbooba.financeservice.dto.response.TransactionTransferResponse;
import com.uhbooba.financeservice.entity.Account;
import com.uhbooba.financeservice.entity.SavingsProduct;
import com.uhbooba.financeservice.entity.UserAccount;
import com.uhbooba.financeservice.exception.SavingsFailedException;
import com.uhbooba.financeservice.mapper.SavingsProductMapper;
import com.uhbooba.financeservice.repository.SavingsProductRepository;
import com.uhbooba.financeservice.service.finapi.FinApiSavingsService;
import com.uhbooba.financeservice.util.JsonToDtoConverter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class SavingsService {


    private final FinApiSavingsService finApiSavingsService;
    private final UserAccountService userAccountService;
    private final AccountService accountService;
    private final TransactionService transactionService;

    private final JsonToDtoConverter jsonToDtoConverter;

    private final SavingsProductRepository savingsProductRepository;

    private final SavingsProductMapper savingsProductMapper;

    @Transactional
    public SavingsResponse createSavings(
        SavingsCreateRequest dto
    ) {
        JsonNode createdSavings = finApiSavingsService.createSavings(dto)
                                                      .block();

        SavingsResponse savingsResponse = jsonToDtoConverter.convertToObject(createdSavings,
                                                                             SavingsResponse.class);
        SavingsProduct savings = savingsProductMapper.toEntity(savingsResponse);
        savingsProductRepository.save(savings);

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
    @Transactional(readOnly = true)
    public List<SavingsResponse> getAllSavings() {
        List<SavingsProduct> savingsProducts = savingsProductRepository.findAll();
        return savingsProductMapper.toDto(savingsProducts);
    }

    @Transactional
    public SavingsAccountResponse createSavingsAccount(
        UserHeaderInfo userHeaderInfo,
        SavingsAccountCreateRequest dto
    ) {
        // 1. 사용자 계정 찾기
        UserAccount userAccount = getUserAccountByUserId(userHeaderInfo.userId());
        String userKey = userAccount.getUserKey();

        Account sourceAccount = accountService.findByAccountNo(dto.withdrawalAccountNo());

        // transaction 생성
        TransactionTransferResponse transactionRequests = transactionService.createTransactionRequest(
            dto, sourceAccount);

        try {
            JsonNode createdSavings = finApiSavingsService.createSavingsAccount(userKey, dto)
                                                          .block();

            SavingsAccountResponse savingsAccountResponse = jsonToDtoConverter.convertToObject(
                createdSavings, SavingsAccountResponse.class);

            // 2. 적금 계좌 저장하기
            Account account = accountService.createAccount(savingsAccountResponse, userAccount);

            // 기존 입출금 계좌에 대한 transaction 처리(transaction unique no 가 없음)
            transactionService.updateTransactionForSuccess(transactionRequests.senderTransaction(),
                                                           TransactionUpdateRequest.builder()
                                                                                   .build());
            // 예금 계좌에 대한 transaction 처리
            transactionService.updateTransactionForSuccess(
                transactionRequests.receiverTransaction(), TransactionUpdateRequest.builder()
                                                                                   .account(account)
                                                                                   .build());
            // 계좌 잔액 변경
            accountService.subtractAccountBalance(sourceAccount, dto.savingsBalance());
            accountService.addAccountBalance(account, dto.savingsBalance());
            return savingsAccountResponse;
        } catch(Exception ex) {
            // 트랜잭션 실패 처리
            transactionService.updateTransactionForFail(transactionRequests.receiverTransaction(),
                                                        ex);
            transactionService.updateTransactionForFail(transactionRequests.senderTransaction(),
                                                        ex);
            throw new SavingsFailedException();
        }
    }

    private UserAccount getUserAccountByUserId(Integer userId) {
        return userAccountService.getUserAccountByUserId(userId);
    }

    private String getUserKey(Integer userId) {
        return userAccountService.getUserAccountByUserId(userId)
                                 .getUserKey();
    }

    public SavingsAccountResponse getSavingsAccount(
        UserHeaderInfo userHeaderInfo,
        String accountNo
    ) {
        // 1. 사용자 계정 찾기
        String userKey = getUserKey(userHeaderInfo.userId());
        JsonNode savingsAccount = finApiSavingsService.getSavingsAccount(userKey, accountNo)
                                                      .block();
        return jsonToDtoConverter.convertToObject(savingsAccount, SavingsAccountResponse.class);
    }

    public List<SavingsAccountResponse> getAllSavingsAccounts(
        UserHeaderInfo userHeaderInfo
    ) {
        // 1. 사용자 계정 찾기
        String userKey = getUserKey(userHeaderInfo.userId());
        JsonNode savingsAccounts = finApiSavingsService.getSavingsAccounts(userKey)
                                                       .block();
        return jsonToDtoConverter.convertToList(savingsAccounts.get("list"),
                                                new TypeReference<List<SavingsAccountResponse>>() {});
    }

    public SavingsExpiryInterestResponse getSavingsExpiryInterest(
        UserHeaderInfo userHeaderInfo,
        String accountNo
    ) {
        // 1. 사용자 계정 찾기
        String userKey = getUserKey(userHeaderInfo.userId());
        JsonNode savingsExpiryInterest = finApiSavingsService.getSavingsExpiryInterest(userKey,
                                                                                       accountNo)
                                                             .block();
        return jsonToDtoConverter.convertToObject(savingsExpiryInterest,
                                                  SavingsExpiryInterestResponse.class);
    }

    public SavingsEarlyTerminationInterestResponse getSavingsEarlyTerminationInterest(
        UserHeaderInfo userHeaderInfo,
        String accountNo
    ) {
        // 1. 사용자 계정 찾기
        String userKey = getUserKey(userHeaderInfo.userId());
        JsonNode nodeMono = finApiSavingsService.getSavingsEarlyTerminationInterest(userKey,
                                                                                    accountNo)
                                                .block();
        return jsonToDtoConverter.convertToObject(nodeMono,
                                                  SavingsEarlyTerminationInterestResponse.class);
    }

    @Transactional
    public SavingsAccountDeleteResponse deleteSavingsAccount(
        UserHeaderInfo userHeaderInfo,
        String accountNo
    ) {
        // 1. 사용자 계정 찾기
        UserAccount userAccount = getUserAccountByUserId(userHeaderInfo.userId());
        String userKey = userAccount.getUserKey();

        // 2. 삭제하기
        JsonNode deletedSavings = finApiSavingsService.deleteSavingsAccount(userKey, accountNo)
                                                      .block();
        // 3. db 내에도 삭제하기
        accountService.deleteAccount(accountNo);

        return jsonToDtoConverter.convertToObject(deletedSavings,
                                                  SavingsAccountDeleteResponse.class);
    }

    @Transactional
    public void savingsInitSetting() {
        String[] accountNames = new String[]{"정기적금 1번 상품", "정기적금 2번 상품", "정기적금 3번 상품"};
        String[] subscriptionPeriods = new String[]{"90", "180", "365"};
        Long[] minSubscriptionBalances = new Long[]{10000L, 100000L, 500000L};
        Long[] maxSubscriptionBalances = new Long[]{1000000L, 1000000L, 1000000L}; // 최대 100만원
        Double[] interestRates = new Double[]{5.0, 7.0, 10.0};

        for(int i = 0; i < 3; i++) {
            createSavings(SavingsCreateRequest.builder()
                                              .bankCode("999")
                                              .accountName(accountNames[i])
                                              .accountDescription(accountNames[i] + "입니다.")
                                              .subscriptionPeriod(subscriptionPeriods[i])
                                              .minSubscriptionBalance(minSubscriptionBalances[i])
                                              .maxSubscriptionBalance(maxSubscriptionBalances[i])
                                              .interestRate(interestRates[i])
                                              .rateDescription("이율은 " + interestRates[i] + "%입니다.")
                                              .build());
        }
    }
}
