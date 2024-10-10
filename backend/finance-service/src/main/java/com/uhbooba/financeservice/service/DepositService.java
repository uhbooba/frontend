package com.uhbooba.financeservice.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.UserHeaderInfo;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositDepositAccountRequest;
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
import java.util.List;
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
    private final AccountService accountService;
    private final TransactionService transactionService;
    private final DemandDepositService demandDepositService;

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
        DepositProduct deposit = depositProductMapper.toEntity(depositResponse);
        depositProductRepository.save(deposit);

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
        UserHeaderInfo userHeaderInfo,
        DepositAccountCreateRequest dto
    ) {
        // 1. 사용자 계정 찾기
        UserAccount userAccount = getUserAccountByUserId(userHeaderInfo.userId());
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
                                                                                   .build(),
                                                           userHeaderInfo.userId());
            // 예금 계좌에 대한 transaction 처리
            transactionService.updateTransactionForSuccess(
                transactionRequests.receiverTransaction(), TransactionUpdateRequest.builder()
                                                                                   .account(account)
                                                                                   .build(),
                userHeaderInfo.userId());

            // 계좌 잔액 변경
            accountService.subtractAccountBalance(sourceAccount, dto.depositBalance());
            accountService.addAccountBalance(account, dto.depositBalance());
            return depositAccountResponse;
        } catch(Exception ex) {
            // 트랜잭션 실패 처리
            transactionService.updateTransactionForFail(transactionRequests.receiverTransaction(),
                                                        ex);
            transactionService.updateTransactionForFail(transactionRequests.senderTransaction(),
                                                        ex);
            throw new DepositFailedException(ex.getMessage());
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
        UserHeaderInfo userHeaderInfo,
        String accountNo
    ) {
        // 1. 사용자 계정 찾기
        String userKey = getUserKey(userHeaderInfo.userId());
        JsonNode depositAccount = finApiDepositService.getDepositAccount(userKey, accountNo)
                                                      .block();
        return jsonToDtoConverter.convertToObject(depositAccount, DepositAccountResponse.class);
    }

    public List<DepositAccountResponse> getAllDepositAccounts(
        UserHeaderInfo userHeaderInfo
    ) {
        // 1. 사용자 계정 찾기
        String userKey = getUserKey(userHeaderInfo.userId());
        JsonNode depositAccounts = finApiDepositService.getDepositAccounts(userKey)
                                                       .block();
        return jsonToDtoConverter.convertToList(depositAccounts.get("list"),
                                                new TypeReference<List<DepositAccountResponse>>() {});
    }

    public DepositExpiryInterestResponse getDepositExpiryInterest(
        UserHeaderInfo userHeaderInfo,
        String accountNo
    ) {
        // 1. 사용자 계정 찾기
        String userKey = getUserKey(userHeaderInfo.userId());
        JsonNode depositExpiryInterest = finApiDepositService.getDepositExpiryInterest(userKey,
                                                                                       accountNo)
                                                             .block();
        return jsonToDtoConverter.convertToObject(depositExpiryInterest,
                                                  DepositExpiryInterestResponse.class);
    }

    public DepositEarlyTerminationInterestResponse getDepositEarlyTerminationInterest(
        UserHeaderInfo userHeaderInfo,
        String accountNo
    ) {
        // 1. 사용자 계정 찾기
        String userKey = getUserKey(userHeaderInfo.userId());
        JsonNode nodeMono = finApiDepositService.getDepositEarlyTerminationInterest(userKey,
                                                                                    accountNo)
                                                .block();
        return jsonToDtoConverter.convertToObject(nodeMono,
                                                  DepositEarlyTerminationInterestResponse.class);
    }

    @Transactional
    public DepositAccountDeleteResponse deleteDepositAccount(
        UserHeaderInfo userHeaderInfo,
        String accountNo
    ) {
        // 1. 사용자 계정 찾기
        UserAccount userAccount = getUserAccountByUserId(userHeaderInfo.userId());
        String userKey = userAccount.getUserKey();

        // 1.1 사용자 입출금 계좌 찾기
        Account demandDepositAccount = demandDepositService.getDemandDepositAccountInInternal(
            userAccount);

        // 1.2 해지 금액 알아내기
        JsonNode earlyTermination = finApiDepositService.getDepositEarlyTerminationInterest(userKey,
                                                                                            accountNo)
                                                        .block();
        DepositEarlyTerminationInterestResponse depositEarlyTerminationInterestResponse = jsonToDtoConverter.convertToObject(
            earlyTermination, DepositEarlyTerminationInterestResponse.class);

        String terminationBalanceString = depositEarlyTerminationInterestResponse.earlyTerminationBalance();
        Long terminationBalance = Long.parseLong(terminationBalanceString);

        try {
            // 2. 삭제하기
            JsonNode deletedDeposit = finApiDepositService.deleteDepositAccount(userKey, accountNo)
                                                          .block();
            // 3. db 내에도 삭제하기
            accountService.deleteAccount(accountNo);

            // 4. 입출금 계좌에 넣어놓기
            DemandDepositDepositAccountRequest request = DemandDepositDepositAccountRequest.builder()
                                                                                           .accountNo(
                                                                                               demandDepositAccount.getAccountNo())
                                                                                           .transactionBalance(
                                                                                               terminationBalance)
                                                                                           .transactionSummary(
                                                                                               "예금 해지")
                                                                                           .build();
            demandDepositService.depositDemandDepositAccount(userHeaderInfo, request);

            return jsonToDtoConverter.convertToObject(deletedDeposit,
                                                      DepositAccountDeleteResponse.class);
        } catch(Exception ex) {
            throw new DepositFailedException("예금 해지 실패 : " + ex.getMessage());
        }
    }

    @Transactional
    public void depositInitSetting() {
        String[] accountNames = new String[]{"정기예금 1번 상품", "정기예금 2번 상품", "정기예금 3번 상품"};
        String[] subscriptionPeriods = new String[]{"90", "180", "365"};
        Long[] minSubscriptionBalances = new Long[]{100000L, 500000L, 1000000L};
        Long[] maxSubscriptionBalances = new Long[]{10000000L, 10000000L, 10000000L};
        Double[] interestRates = new Double[]{7.0, 10.0, 12.0};

        for(int i = 0; i < 3; i++) {
            createDeposit(DepositCreateRequest.builder()
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
