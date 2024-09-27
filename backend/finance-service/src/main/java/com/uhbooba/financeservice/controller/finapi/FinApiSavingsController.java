package com.uhbooba.financeservice.controller.finapi;

import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.request.savings.SavingsAccountCreateRequest;
import com.uhbooba.financeservice.dto.finapi.request.savings.SavingsCreateRequest;
import com.uhbooba.financeservice.service.finapi.FinApiSavingsService;
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
@Tag(name = "[사용 X]적금 API", description = "적금 API 입니다.")
@RequestMapping("/fin-api/savings")
public class FinApiSavingsController {

    private final FinApiSavingsService finApiSavingsService;

    @PostMapping("/create-account")
    @Operation(summary = "적금 계좌 생성")
    public Mono<JsonNode> createSavingsAccount(
        @RequestParam("userKey") String userKey,
        @RequestBody SavingsAccountCreateRequest dto
    ) {
        return finApiSavingsService.createSavingsAccount(userKey, dto);
    }

    @PostMapping("/create-deposit")
    @Operation(summary = "적금 상품 만들기")
    public Mono<JsonNode> createSavings(@RequestBody SavingsCreateRequest dto) {
        return finApiSavingsService.createSavings(dto);
    }

    @GetMapping("/deposit-products")
    @Operation(summary = "적금 상품 전체 조회")
    public Mono<JsonNode> getSavingsProducts() {

        return finApiSavingsService.getSavingsProducts();
    }

    @GetMapping("/expiry-interest")
    @Operation(summary = "적금 만기 이자 조회")
    public Mono<JsonNode> getSavingsExpiryInterest(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return finApiSavingsService.getSavingsExpiryInterest(userKey, accountNo);
    }

    @GetMapping("/early-termination-interest")
    @Operation(summary = "적금 중도 해지 시 이자 조회")
    public Mono<JsonNode> getSavingsEarlyTerminationInterest(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return finApiSavingsService.getSavingsEarlyTerminationInterest(userKey, accountNo);
    }

    @DeleteMapping("/delete-account")
    @Operation(summary = "입출금 계좌 삭제")
    public Mono<JsonNode> deleteSavingsAccount(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return finApiSavingsService.deleteSavingsAccount(userKey, accountNo);
    }

    @GetMapping("/account-detail")
    @Operation(summary = "적금 계좌 상세 조회")
    public Mono<JsonNode> getSavingsAccount(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return finApiSavingsService.getSavingsAccount(userKey, accountNo);
    }

    @GetMapping("/accounts")
    @Operation(summary = "사용자의 적금 계좌 목록 조회")
    public Mono<JsonNode> getSavingsAccounts(@RequestParam("userKey") String userKey) {
        return finApiSavingsService.getSavingsAccounts(userKey);
    }
}

