package com.uhbooba.financeservice.service;

import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositDepositAccountRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositTransferAccountRequest;
import com.uhbooba.financeservice.dto.finapi.request.deposit.DepositAccountCreateRequest;
import com.uhbooba.financeservice.dto.finapi.request.exchange.ExchangeRequest;
import com.uhbooba.financeservice.dto.finapi.request.savings.SavingsAccountCreateRequest;
import com.uhbooba.financeservice.dto.request.TransactionCreateRequest;
import com.uhbooba.financeservice.dto.request.TransactionUpdateRequest;
import com.uhbooba.financeservice.dto.response.TransactionOutputResponse;
import com.uhbooba.financeservice.dto.response.TransactionTransferResponse;
import com.uhbooba.financeservice.entity.Account;
import com.uhbooba.financeservice.entity.Transaction;
import com.uhbooba.financeservice.entity.TransactionStatus;
import com.uhbooba.financeservice.entity.TransactionType;
import com.uhbooba.financeservice.exception.NotFoundException;
import com.uhbooba.financeservice.mapper.TransactionMapper;
import com.uhbooba.financeservice.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransactionService {

    private final AccountService accountService;

    private final TransactionRepository transactionRepository;

    private final TransactionMapper transactionMapper;

    @Transactional
    public Transaction createTransaction(TransactionCreateRequest request) {

        log.info("[{}] Creating transaction for AccountNo {}", request.type(), request.account());
        Transaction transaction = transactionMapper.toEntity(request);
        return transactionRepository.save(transaction);
    }

    @Transactional(readOnly = true)
    public TransactionOutputResponse getTransactionById(Integer id) {
        Transaction transaction = getTransactionByIdWithException(id);
        return transactionMapper.toDto(transaction);
    }

    @Transactional(readOnly = true)
    public Transaction getTransactionByIdWithException(Integer id) {
        return transactionRepository.findById(id)
                                    .orElseThrow(() -> new NotFoundException("결제 내역을 찾을 수 없습니다."));
    }

    @Transactional(readOnly = true)
    public Page<TransactionOutputResponse> getAllTransactionsByAccountId(
        Integer accountId,
        Pageable pageable
    ) {
        Page<Transaction> transactions = transactionRepository.findByAccountId(accountId, pageable);
        return transactions.map(transactionMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Page<TransactionOutputResponse> getAllTransactionsByAccountNo(
        String accountNo,
        Pageable pageable
    ) {
        Account account = accountService.findByAccountNo(accountNo);

        // 기본적으로 createdAt을 기준으로 최신순으로 정렬된 pageable 생성
        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
                                                 Sort.by(Sort.Direction.DESC, "updatedAt")
                                                 // "updatedAt" 필드를 기준으로 정렬
        );

        return getAllTransactionsByAccountId(account.getId(), sortedPageable);
    }

    @Transactional
    public Transaction updateTransactionForSuccess(
        Transaction transaction,
        String transactionUniqueNo
    ) {
        try {
            log.info("[TRANSACTION SUCCESS] transactionId : {}", transaction.getId());
            transaction.setTransactionUniqueNo(transactionUniqueNo);
            transaction.setStatus(TransactionStatus.SUCCESS);
            return transactionRepository.save(transaction);
        } catch(Exception ex) {
            updateTransactionForFail(transaction, ex);
            return transaction;
        }
    }

    @Transactional
    public Transaction updateTransactionForSuccess(
        Transaction transaction,
        TransactionUpdateRequest updateRequest
    ) {
        try {
            log.info("[TRANSACTION SUCCESS] transactionId : {}", transaction.getId());
            if(updateRequest.transactionUniqueNo() != null) {
                transaction.setTransactionUniqueNo(updateRequest.transactionUniqueNo());
            }
            if(updateRequest.account() != null) {
                transaction.setAccount(updateRequest.account());
            }
            if(updateRequest.transactionSummary() != null) {
                transaction.setTransactionSummary(updateRequest.transactionSummary());
            }
            transaction.setStatus(TransactionStatus.SUCCESS);
            return transactionRepository.save(transaction);
        } catch(Exception ex) {
            updateTransactionForFail(transaction, ex);
            return transaction;
        }
    }

    @Transactional
    public Transaction updateTransactionForFail(
        Transaction transaction,
        Exception ex
    ) {
        log.error("[TRANSACTION FAIL] transactionId : {}, reason : {}", transaction.getId(),
                  ex.getMessage());
        transaction.setStatus(TransactionStatus.FAILED);
        return transactionRepository.save(transaction);
    }

    @Transactional
    public Transaction createTransactionRequest(
        DemandDepositDepositAccountRequest request,
        Account account
    ) {
        Long transactionBalance = request.transactionBalance();
        // transaction 생성
        TransactionCreateRequest transactionCreateRequest = TransactionCreateRequest.builder()
                                                                                    .account(
                                                                                        account)
                                                                                    .status(
                                                                                        TransactionStatus.PENDING)
                                                                                    .type(
                                                                                        TransactionType.DEPOSIT)
                                                                                    .transactionBalance(
                                                                                        transactionBalance)
                                                                                    .transactionAfterBalance(
                                                                                        transactionBalance
                                                                                            + account.getBalance())
                                                                                    .transactionSummary(
                                                                                        request.transactionSummary())
                                                                                    .build();
        return createTransaction(transactionCreateRequest);
    }

    @Transactional
    public TransactionTransferResponse createTransactionRequest(
        DemandDepositTransferAccountRequest request,
        Account receiverAccount,
        Account senderAccount
    ) {
        Long transactionBalance = request.transactionBalance();
        // 이체받는 transaction 생성
        TransactionCreateRequest receiverRequest = TransactionCreateRequest.builder()
                                                                           .account(receiverAccount)
                                                                           .status(
                                                                               TransactionStatus.PENDING)
                                                                           .type(
                                                                               TransactionType.DEPOSIT_TRANSFER)
                                                                           .transactionBalance(
                                                                               (transactionBalance))
                                                                           .transactionAfterBalance(
                                                                               transactionBalance
                                                                                   + receiverAccount.getBalance())
                                                                           .transactionSummary(
                                                                               request.depositTransactionSummary())
                                                                           .build();
        Transaction receiverTransaction = createTransaction(receiverRequest);

        // 이체하는 transaction 생성
        TransactionCreateRequest senderRequest = TransactionCreateRequest.builder()
                                                                         .account(senderAccount)
                                                                         .status(
                                                                             TransactionStatus.PENDING)
                                                                         .type(
                                                                             TransactionType.WITHDRAWAL_TRANSFER)
                                                                         .transactionBalance(
                                                                             (transactionBalance))
                                                                         .transactionAfterBalance(
                                                                             senderAccount.getBalance()
                                                                                 - transactionBalance)
                                                                         .transactionSummary(
                                                                             request.withdrawalTransactionSummary())
                                                                         .build();
        Transaction senderTransaction = createTransaction(senderRequest);

        TransactionTransferResponse transferResponse = TransactionTransferResponse.builder()
                                                                                  .receiverTransaction(
                                                                                      receiverTransaction)
                                                                                  .senderTransaction(
                                                                                      senderTransaction)
                                                                                  .build();
        return transferResponse;
    }

    @Transactional
    public TransactionTransferResponse createTransactionRequest(
        DepositAccountCreateRequest request,
        Account sourceAccount
    ) {
        Long transactionBalance = request.depositBalance();
        // 이체받는 transaction 생성
        TransactionCreateRequest receiverRequest = TransactionCreateRequest.builder()
                                                                           .status(
                                                                               TransactionStatus.PENDING)
                                                                           .type(
                                                                               TransactionType.DEPOSIT_TRANSFER)
                                                                           .transactionBalance(
                                                                               (transactionBalance))
                                                                           .transactionAfterBalance(
                                                                               transactionBalance)
                                                                           .transactionSummary(
                                                                               sourceAccount.getAccountNo()
                                                                                   + "로부터 예금 금액 입금")
                                                                           .build();
        Transaction receiverTransaction = createTransaction(receiverRequest);

        // 이체하는 transaction 생성
        TransactionCreateRequest senderRequest = TransactionCreateRequest.builder()
                                                                         .account(sourceAccount)
                                                                         .status(
                                                                             TransactionStatus.PENDING)
                                                                         .type(
                                                                             TransactionType.WITHDRAWAL_TRANSFER)
                                                                         .transactionBalance(
                                                                             (transactionBalance))
                                                                         .transactionAfterBalance(
                                                                             sourceAccount.getBalance()
                                                                                 - transactionBalance)
                                                                         .transactionSummary(
                                                                             "예금 금액 출금")
                                                                         .build();
        Transaction senderTransaction = createTransaction(senderRequest);

        TransactionTransferResponse transferResponse = TransactionTransferResponse.builder()
                                                                                  .receiverTransaction(
                                                                                      receiverTransaction)
                                                                                  .senderTransaction(
                                                                                      senderTransaction)
                                                                                  .build();
        return transferResponse;
    }

    @Transactional
    public TransactionTransferResponse createTransactionRequest(
        SavingsAccountCreateRequest request,
        Account sourceAccount
    ) {
        Long transactionBalance = request.savingsBalance();
        // 이체받는 transaction 생성
        TransactionCreateRequest receiverRequest = TransactionCreateRequest.builder()
                                                                           .status(
                                                                               TransactionStatus.PENDING)
                                                                           .type(
                                                                               TransactionType.DEPOSIT_TRANSFER)
                                                                           .transactionBalance(
                                                                               (transactionBalance))
                                                                           .transactionAfterBalance(
                                                                               transactionBalance)
                                                                           .transactionSummary(
                                                                               sourceAccount.getAccountNo()
                                                                                   + "로부터 적금 금액 입금")
                                                                           .build();
        Transaction receiverTransaction = createTransaction(receiverRequest);

        // 이체하는 transaction 생성
        TransactionCreateRequest senderRequest = TransactionCreateRequest.builder()
                                                                         .account(sourceAccount)
                                                                         .status(
                                                                             TransactionStatus.PENDING)
                                                                         .type(
                                                                             TransactionType.WITHDRAWAL_TRANSFER)
                                                                         .transactionBalance(
                                                                             (transactionBalance))
                                                                         .transactionAfterBalance(
                                                                             sourceAccount.getBalance()
                                                                                 - transactionBalance)
                                                                         .transactionSummary(
                                                                             "적금 금액 출금")
                                                                         .build();
        Transaction senderTransaction = createTransaction(senderRequest);

        TransactionTransferResponse transferResponse = TransactionTransferResponse.builder()
                                                                                  .receiverTransaction(
                                                                                      receiverTransaction)
                                                                                  .senderTransaction(
                                                                                      senderTransaction)
                                                                                  .build();
        return transferResponse;
    }

    @Transactional
    public Transaction createTransactionRequest(
        ExchangeRequest request,
        Account account
    ) {
        Long transactionBalance = request.exchangeAmount();
        // 환전 transaction 생성
        TransactionCreateRequest receiverRequest = TransactionCreateRequest.builder()
                                                                           .account(account)
                                                                           .status(
                                                                               TransactionStatus.PENDING)
                                                                           .type(
                                                                               TransactionType.EXCHANGE)
                                                                           .transactionBalance(
                                                                               request.exchangeAmount())
                                                                           .transactionAfterBalance(
                                                                               account.getBalance()
                                                                                   - transactionBalance)
                                                                           .transactionSummary("환전")
                                                                           .build();

        return createTransaction(receiverRequest);
    }
}
