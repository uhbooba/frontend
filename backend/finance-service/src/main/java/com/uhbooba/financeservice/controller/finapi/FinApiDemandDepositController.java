package com.uhbooba.financeservice.controller.finapi;

import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositCreateRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositDepositAccountRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositGetTransactionRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositGetTransactionsRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositTransferAccountRequest;
import com.uhbooba.financeservice.service.finapi.FinApiDemandDepositService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@Slf4j
@Tag(name = "[사용 X]수시 입출금 API", description = "수시 입출금 API 입니다.")
@RequestMapping("/fin-api/demand-deposit")
public class FinApiDemandDepositController {

    private final FinApiDemandDepositService finApiDemandDepositService;

    @PostMapping("/create")
    @Operation(summary = "입출금 상품 생성")
    public Mono<JsonNode> createDemandDeposit(
        @RequestBody DemandDepositCreateRequest createRequest
    ) {
        return finApiDemandDepositService.createDemandDeposit(createRequest);
    }

    @PostMapping("/get")
    @Operation(summary = "입출금 상품 전체 조회")
    public Mono<JsonNode> getDemandDeposits(
    ) {
        return finApiDemandDepositService.getDemandDepositProducts();
    }

    @PostMapping("/create-account")
    @Operation(summary = "입출금 계좌 유형으로 계좌 생성")
    public Mono<JsonNode> createDemandDepositAccount(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountTypeUniqueNo") String accountTypeUniqueNo
    ) {
        return finApiDemandDepositService.createDemandDepositAccount(userKey, accountTypeUniqueNo);
    }

    @PostMapping("/account-detail")
    @Operation(summary = "입출금계좌 조회")
    public Mono<JsonNode> getAccountDetail(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return finApiDemandDepositService.getDemandDepositAccount(userKey, accountNo);
    }

    @PostMapping("/accounts")
    @Operation(summary = "사용자의 모든 입출금계좌 조회")
    public Mono<JsonNode> getAllAccounts(@RequestParam("userKey") String userKey) {
        return finApiDemandDepositService.getDemandDepositAccounts(userKey);
    }

    @PostMapping("/account-holder")
    @Operation(summary = "입출금계좌 소유자 이름 조회")
    public Mono<JsonNode> getAccountHolderName(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return finApiDemandDepositService.getDemandDepositAccountHolderName(userKey, accountNo);
    }

    @PostMapping("/balance")
    @Operation(summary = "입출금계좌 잔액 조회")
    public Mono<JsonNode> getAccountBalance(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return finApiDemandDepositService.getDemandDepositAccountBalance(userKey, accountNo);
    }

    @PostMapping("/deposit")
    @Operation(summary = "입출금계좌에 예금")
    public Mono<JsonNode> depositAccount(
        @RequestParam("userKey") String userKey,
        @RequestBody DemandDepositDepositAccountRequest accountRequest
    ) {
        return finApiDemandDepositService.depositDemandDepositAccount(userKey, accountRequest);
    }

    @PostMapping("/transfer")
    @Operation(summary = "입출금계좌에서 출금 및 이체")
    public Mono<JsonNode> transferAccount(
        @RequestParam("userKey") String userKey,
        @RequestBody DemandDepositTransferAccountRequest transferAccountRequest
    ) {
        return finApiDemandDepositService.transferDemandDepositAccount(userKey,
                                                                       transferAccountRequest);
    }

    @PostMapping("/transaction-histories")
    @Operation(summary = "입출금계좌 거래내역 조회")
    public Mono<JsonNode> getTransactionHistories(
        @RequestParam("userKey") String userKey,
        @RequestBody DemandDepositGetTransactionsRequest getTransactionsRequest
    ) {
        return finApiDemandDepositService.getTransactionHistories(userKey, getTransactionsRequest);
    }

    @PostMapping("/transaction-history")
    @Operation(summary = "입출금계좌 단일 거래내역 조회")
    public Mono<JsonNode> getTransactionHistory(
        @RequestParam("userKey") String userKey,
        @RequestBody DemandDepositGetTransactionRequest getTransactionRequest
    ) {
        return finApiDemandDepositService.getTransactionHistory(userKey, getTransactionRequest);
    }
}
