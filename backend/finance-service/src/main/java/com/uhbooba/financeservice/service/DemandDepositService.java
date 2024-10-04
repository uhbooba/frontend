package com.uhbooba.financeservice.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.UserHeaderInfo;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositCreateRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositDepositAccountRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositGetTransactionRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositGetTransactionsRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositTransferAccountRequest;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositAccountBalanceResponse;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositAccountCreateResponse;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositAccountResponse;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositDepositResponse;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositResponse;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositTransferResponse;
import com.uhbooba.financeservice.dto.finapi.response.transaction.TransactionListResponse;
import com.uhbooba.financeservice.dto.finapi.response.transaction.TransactionResponse;
import com.uhbooba.financeservice.dto.response.AccountResponse;
import com.uhbooba.financeservice.dto.response.TransactionTransferResponse;
import com.uhbooba.financeservice.entity.Account;
import com.uhbooba.financeservice.entity.AccountType;
import com.uhbooba.financeservice.entity.Transaction;
import com.uhbooba.financeservice.entity.UserAccount;
import com.uhbooba.financeservice.exception.DemandDepositAccountAlreadyExistException;
import com.uhbooba.financeservice.exception.DepositFailedException;
import com.uhbooba.financeservice.exception.NotFoundException;
import com.uhbooba.financeservice.exception.TransferFailedException;
import com.uhbooba.financeservice.mapper.AccountMapper;
import com.uhbooba.financeservice.service.finapi.FinApiDemandDepositService;
import com.uhbooba.financeservice.util.JsonToDtoConverter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class DemandDepositService {

    @Value("${variables.bank-code}")
    private String bankCode;

    @Value("${variables.demand-deposit-product-id}")
    private String demandDepositProductId;

    private final UserAccountService userAccountService;
    private final TransactionService transactionService;
    private final AccountService accountService;

    private final AccountMapper accountMapper;

    private final FinApiDemandDepositService finApiDemandDepositService;
    private final JsonToDtoConverter jsonToDtoConverter;

    private final AccountType ACCOUNT_TYPE = AccountType.DEMAND_DEPOSIT;

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

    @Transactional
    public DemandDepositAccountResponse createDemandDepositAccount(
        UserHeaderInfo userHeaderInfo
    ) {
        // 1. 사용자 계정 찾기
        UserAccount userAccount = userAccountService.getUserAccountByUserId(
            userHeaderInfo.userId());

        // 2. 이미 계좌가 있는지 확인
        try {
            getDemandDepositAccountInInternal(userAccount);
            throw new DemandDepositAccountAlreadyExistException();
        } catch(NotFoundException e) {
            // 계좌가 없으면 계속 진행
        }

        String userKey = userAccount.getUserKey();
        String accountTypeUniqueNo = demandDepositProductId;
        // 2. 입출금 계좌 만들기 (동기적 처리)
        // 비동기 API 호출 후 block()으로 동기 처리
        JsonNode createdDemandDeposit = finApiDemandDepositService.createDemandDepositAccount(
                                                                      userKey, accountTypeUniqueNo)
                                                                  .block();
        // JSON을 객체로 변환 후 반환
        DemandDepositAccountCreateResponse demandDepositAccount = jsonToDtoConverter.convertToObject(
            createdDemandDeposit, DemandDepositAccountCreateResponse.class);
        // 3. 계좌 상세 정보 조회해서 데이터 가져오기
        DemandDepositAccountResponse accountResponse = getDemandDepositAccountInFinApi(userKey,
                                                                                       demandDepositAccount.accountNo());
        // 4. DB에 계좌 저장하기
        accountService.createAccount(accountResponse, userAccount);

        return accountResponse;  // 최종 결과 반환
    }

    @Transactional(readOnly = true)
    public AccountResponse getDemandDepositAccount(
        UserHeaderInfo userHeaderInfo
    ) {
        // 1. 사용자 계정 찾기
        UserAccount userAccount = userAccountService.getUserAccountByUserId(
            userHeaderInfo.userId());
        return accountMapper.toDto(getDemandDepositAccountInInternal(userAccount));
    }

    private DemandDepositAccountResponse getDemandDepositAccountInFinApi(
        String userKey,
        String accountNo
    ) {
        JsonNode demandDeposit = finApiDemandDepositService.getDemandDepositAccount(userKey,
                                                                                    accountNo)
                                                           .block();
        return jsonToDtoConverter.convertToObject(demandDeposit,
                                                  DemandDepositAccountResponse.class);
    }

    private Account getDemandDepositAccountInInternal(
        UserAccount userAccount
    ) {
        List<Account> accountList = accountService.getAccountsByCondition(ACCOUNT_TYPE,
                                                                          userAccount);
        if(accountList.isEmpty()) {
            throw new NotFoundException("해당 사용자에 대해 수시 입출금 계좌를 찾을 수 없습니다.");
        }
        if(accountList.size() > 1) {
            throw new DemandDepositAccountAlreadyExistException();
        }
        return accountList.get(0);
    }

    public AccountResponse getDemandDepositAccountHolderName(
        UserHeaderInfo userHeaderInfo,
        String accountNo
    ) {
        return accountMapper.toDto(accountService.findByAccountNo(accountNo));
    }

    public DemandDepositAccountBalanceResponse getDemandDepositAccountBalance(
        UserHeaderInfo userHeaderInfo,
        String accountNo
    ) {
        UserAccount userAccount = userAccountService.getUserAccountByUserId(
            userHeaderInfo.userId());
        String userKey = userAccount.getUserKey();

        JsonNode balance = finApiDemandDepositService.getDemandDepositAccountBalance(userKey,
                                                                                     accountNo)
                                                     .block();
        return jsonToDtoConverter.convertToObject(balance,
                                                  DemandDepositAccountBalanceResponse.class);
    }

    /**
     * 입금
     *
     * @param userId
     * @param depositRequest
     * @return
     */
    @Transactional
    public DemandDepositDepositResponse depositDemandDepositAccount(
        UserHeaderInfo userHeaderInfo,
        DemandDepositDepositAccountRequest depositRequest
    ) {
        UserAccount userAccount = userAccountService.getUserAccountByUserId(
            userHeaderInfo.userId());
        String userKey = userAccount.getUserKey();
        Account account = accountService.findByAccountNo(depositRequest.accountNo());

        // 입금 트랜잭션 생성
        Transaction transaction = transactionService.createTransactionRequest(depositRequest,
                                                                              account);

        try {
            JsonNode deposit = finApiDemandDepositService.depositDemandDepositAccount(userKey,
                                                                                      depositRequest)
                                                         .block();

            DemandDepositDepositResponse depositDepositResponse = jsonToDtoConverter.convertToObject(
                deposit, DemandDepositDepositResponse.class);

            // transaction 수정
            transactionService.updateTransactionForSuccess(transaction,
                                                           depositDepositResponse.transactionUniqueNo());

            // 잔액 수정
            accountService.addAccountBalance(account, depositRequest.transactionBalance());
            return depositDepositResponse;
        } catch(Exception ex) {
            transactionService.updateTransactionForFail(transaction, ex);
            throw new DepositFailedException();
        }

    }

    /**
     * 이체
     *
     * @param userHeaderInfo
     * @param transferAccountRequest
     * @return
     */
    public List<DemandDepositTransferResponse> transferDemandDepositAccount(
        UserHeaderInfo userHeaderInfo,
        DemandDepositTransferAccountRequest transferAccountRequest
    ) {
        UserAccount userAccount = userAccountService.getUserAccountByUserId(
            userHeaderInfo.userId());
        String userKey = userAccount.getUserKey();

        // transaction 생성
        Account transferAccount = accountService.findByAccountNo(
            transferAccountRequest.depositAccountNo());
        Account withdrawalAccount = accountService.findByAccountNo(
            transferAccountRequest.withdrawalAccountNo());

        TransactionTransferResponse transactions = transactionService.createTransactionRequest(
            transferAccountRequest, transferAccount, withdrawalAccount);
        try {
            JsonNode transfer = finApiDemandDepositService.transferDemandDepositAccount(userKey,
                                                                                        transferAccountRequest)
                                                          .block();
            List<DemandDepositTransferResponse> transferResponses = jsonToDtoConverter.convertToList(
                transfer, new TypeReference<List<DemandDepositTransferResponse>>() {});
            // 트랜잭션 성공 처리
            for(DemandDepositTransferResponse transferResponse : transferResponses) {
                if(transferResponse.transactionType()
                                   .equals("2")) { // 출금
                    transactionService.updateTransactionForSuccess(transactions.senderTransaction(),
                                                                   transferResponse.transactionUniqueNo());
                } else { // 입금
                    transactionService.updateTransactionForSuccess(
                        transactions.receiverTransaction(), transferResponse.transactionUniqueNo());
                }
            }

            // 계좌 잔액 수정
            accountService.addAccountBalance(transferAccount,
                                             transferAccountRequest.transactionBalance());
            accountService.subtractAccountBalance(withdrawalAccount,
                                                  transferAccountRequest.transactionBalance());

            return transferResponses;
        } catch(Exception ex) {
            // 트랜잭션 실패 처리
            transactionService.updateTransactionForFail(transactions.receiverTransaction(), ex);
            transactionService.updateTransactionForFail(transactions.senderTransaction(), ex);
            throw new TransferFailedException();
        }
    }

    public TransactionListResponse getTransactionHistories(
        UserHeaderInfo userHeaderInfo,
        DemandDepositGetTransactionsRequest getTransactionRequest
    ) {
        UserAccount userAccount = userAccountService.getUserAccountByUserId(
            userHeaderInfo.userId());
        String userKey = userAccount.getUserKey();

        JsonNode transactions = finApiDemandDepositService.getTransactionHistories(userKey,
                                                                                   getTransactionRequest)
                                                          .block();
        return jsonToDtoConverter.convertToObject(transactions, TransactionListResponse.class);
    }

    public TransactionResponse getTransactionHistory(
        UserHeaderInfo userHeaderInfo,
        DemandDepositGetTransactionRequest getTransactionRequest
    ) {
        UserAccount userAccount = userAccountService.getUserAccountByUserId(
            userHeaderInfo.userId());
        String userKey = userAccount.getUserKey();

        JsonNode transaction = finApiDemandDepositService.getTransactionHistory(userKey,
                                                                                getTransactionRequest)
                                                         .block();
        return jsonToDtoConverter.convertToObject(transaction, TransactionResponse.class);
    }

}
