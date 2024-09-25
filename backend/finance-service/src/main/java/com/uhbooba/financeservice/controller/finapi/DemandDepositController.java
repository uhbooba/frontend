package com.uhbooba.financeservice.controller.finapi;

import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.service.finapi.DemandDepositService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/fin-api/demand-deposit")
public class DemandDepositController {

    private final DemandDepositService demandDepositService;

    @PostMapping("/create")
    @Operation(summary = "입출금 예금 계좌 생성")
    public Mono<JsonNode> createDemandDeposit(
        @RequestParam("bankCode") String bankCode,
        @RequestParam("accountName") String accountName,
        @RequestParam("accountDescription") String accountDescription
    ) {
        return demandDepositService.createDemandDeposit(bankCode, accountName, accountDescription);
    }

    @PostMapping("/create-account")
    @Operation(summary = "입출금 계좌 유형으로 계좌 생성")
    public Mono<JsonNode> createDemandDepositAccount(@RequestParam("accountTypeUniqueNo") String accountTypeUniqueNo) {
        return demandDepositService.createDemandDepositAccount(accountTypeUniqueNo);
    }

    @GetMapping("/account-detail")
    @Operation(summary = "입출금계좌 조회")
    public Mono<JsonNode> getAccountDetail(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return demandDepositService.getDemandDepositAccount(userKey, accountNo);
    }

    @GetMapping("/accounts")
    @Operation(summary = "사용자의 모든 입출금계좌 조회")
    public Mono<JsonNode> getAllAccounts(@RequestParam("userKey") String userKey) {
        return demandDepositService.getDemandDepositAccounts(userKey);
    }

    @GetMapping("/account-holder")
    @Operation(summary = "입출금계좌 소유자 이름 조회")
    public Mono<JsonNode> getAccountHolderName(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return demandDepositService.getDemandDepositAccountHolderName(userKey, accountNo);
    }

    @GetMapping("/balance")
    @Operation(summary = "입출금계좌 잔액 조회")
    public Mono<JsonNode> getAccountBalance(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return demandDepositService.getDemandDepositAccountBalance(userKey, accountNo);
    }

    @PostMapping("/deposit")
    @Operation(summary = "입출금계좌에 예금")
    public Mono<JsonNode> depositAccount(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo,
        @RequestParam("transactionBalance") Long transactionBalance,
        @RequestParam("transactionSummary") String transactionSummary
    ) {
        return demandDepositService.depositDemandDepositAccount(userKey, accountNo,
                                                                transactionBalance,
                                                                transactionSummary);
    }

    @PostMapping("/transfer")
    @Operation(summary = "입출금계좌에서 출금 및 이체")
    public Mono<JsonNode> transferAccount(
        @RequestParam("userKey") String userKey,
        @RequestParam("depositAccountNo") String depositAccountNo,
        @RequestParam("depositTransactionSummary") String depositTransactionSummary,
        @RequestParam("transactionBalance") Long transactionBalance,
        @RequestParam("withdrawalAccountNo") String withdrawalAccountNo,
        @RequestParam("withdrawalTransactionSummary") String withdrawalTransactionSummary
    ) {
        return demandDepositService.transferDemandDepositAccount(userKey, depositAccountNo,
                                                                 depositTransactionSummary,
                                                                 transactionBalance,
                                                                 withdrawalAccountNo,
                                                                 withdrawalTransactionSummary);
    }

    @GetMapping("/transaction-histories")
    @Operation(summary = "입출금계좌 거래내역 조회")
    public Mono<JsonNode> getTransactionHistories(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo,
        @RequestParam("startDate") String startDate,
        @RequestParam("endDate") String endDate,
        @RequestParam("transactionType") String transactionType,
        @RequestParam("orderByType") String orderByType
    ) {
        return demandDepositService.getTransactionHistories(userKey, accountNo, startDate, endDate,
                                                            transactionType, orderByType);
    }

    @GetMapping("/transaction-history")
    @Operation(summary = "입출금계좌 단일 거래내역 조회")
    public Mono<JsonNode> getTransactionHistory(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo,
        @RequestParam("transactionUniqueNo") Long transactionUniqueNo
    ) {
        return demandDepositService.getTransactionHistory(userKey, accountNo, transactionUniqueNo);
    }
}
