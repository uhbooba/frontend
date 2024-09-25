package com.uhbooba.financeservice.controller.finapi;

import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.DepositAccountCreateRequest;
import com.uhbooba.financeservice.dto.finapi.DepositCreateRequest;
import com.uhbooba.financeservice.service.finapi.DepositService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/fin-api/deposit")
public class DepositController {

    private final DepositService depositService;

    @PostMapping("/create-account")
    @Operation(summary = "예금 계좌 생성")
    public Mono<JsonNode> createDepositAccount(@RequestBody DepositAccountCreateRequest dto) {
        return depositService.createDepositAccount(dto);
    }

    @PostMapping("/create-deposit")
    @Operation(summary = "예금 상품 만들기")
    public Mono<JsonNode> createDeposit(@RequestBody DepositCreateRequest dto) {
        return depositService.createDeposit(dto);
    }

    @GetMapping("/deposit-products")
    @Operation(summary = "예금 상품 전체 조회")
    public Mono<JsonNode> getDepositProducts() {
        return depositService.getDepositProducts();
    }

    @GetMapping("/expiry-interest")
    @Operation(summary = "예금 만기 이자 조회")
    public Mono<JsonNode> getDepositExpiryInterest(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return depositService.getDepositExpiryInterest(userKey, accountNo);
    }

    @GetMapping("/early-termination-interest")
    @Operation(summary = "예금 중도 해지 시 이자 조회")
    public Mono<JsonNode> getDepositEarlyTerminationInterest(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return depositService.getDepositEarlyTerminationInterest(userKey, accountNo);
    }

    @DeleteMapping("/delete-account")
    @Operation(summary = "입출금 계좌 삭제")
    public Mono<JsonNode> deleteDepositAccount(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return depositService.deleteDepositAccount(userKey, accountNo);
    }

    @GetMapping("/account-detail")
    @Operation(summary = "예금 계좌 상세 조회")
    public Mono<JsonNode> getDepositAccount(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return depositService.getDepositAccount(userKey, accountNo);
    }

    @GetMapping("/accounts")
    @Operation(summary = "사용자의 예금 계좌 목록 조회")
    public Mono<JsonNode> getDepositAccounts(@RequestParam("userKey") String userKey) {
        return depositService.getDepositAccounts(userKey);
    }
}
