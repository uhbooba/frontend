package com.uhbooba.financeservice.controller.finapi;

import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.request.deposit.DepositAccountCreateRequest;
import com.uhbooba.financeservice.dto.finapi.request.deposit.DepositCreateRequest;
import com.uhbooba.financeservice.service.finapi.FinApiDepositService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "[사용 X]예금 API", description = "예금 API 입니다.")
@RequestMapping("/fin-api/deposit")
public class FinApiDepositController {

    private final FinApiDepositService finApiDepositService;

    @PostMapping("/create-account")
    @Operation(summary = "예금 계좌 생성")
    public Mono<JsonNode> createDepositAccount(
        @RequestParam("userKey") String userKey,
        @RequestBody DepositAccountCreateRequest dto
    ) {
        return finApiDepositService.createDepositAccount(userKey, dto);
    }

    @PostMapping("/create-deposit")
    @Operation(summary = "예금 상품 만들기")
    public Mono<JsonNode> createDeposit(@RequestBody DepositCreateRequest dto) {
        return finApiDepositService.createDeposit(dto);
    }

    @GetMapping("/deposit-products")
    @Operation(summary = "예금 상품 전체 조회")
    public Mono<JsonNode> getDepositProducts() {
        return finApiDepositService.getDepositProducts();
    }

    @GetMapping("/expiry-interest")
    @Operation(summary = "예금 만기 이자 조회")
    public Mono<JsonNode> getDepositExpiryInterest(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return finApiDepositService.getDepositExpiryInterest(userKey, accountNo);
    }

    @GetMapping("/early-termination-interest")
    @Operation(summary = "예금 중도 해지 시 이자 조회")
    public Mono<JsonNode> getDepositEarlyTerminationInterest(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return finApiDepositService.getDepositEarlyTerminationInterest(userKey, accountNo);
    }

    @DeleteMapping("/delete-account")
    @Operation(summary = "입출금 계좌 삭제")
    public Mono<JsonNode> deleteDepositAccount(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return finApiDepositService.deleteDepositAccount(userKey, accountNo);
    }

    @GetMapping("/account-detail")
    @Operation(summary = "예금 계좌 상세 조회")
    public Mono<JsonNode> getDepositAccount(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return finApiDepositService.getDepositAccount(userKey, accountNo);
    }

    @GetMapping("/accounts")
    @Operation(summary = "사용자의 예금 계좌 목록 조회")
    public Mono<JsonNode> getDepositAccounts(@RequestParam("userKey") String userKey) {
        return finApiDepositService.getDepositAccounts(userKey);
    }
}
