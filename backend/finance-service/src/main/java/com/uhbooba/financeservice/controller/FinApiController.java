package com.uhbooba.financeservice.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.DepositAccountCreateRequest;
import com.uhbooba.financeservice.dto.finapi.DepositCreateRequest;
import com.uhbooba.financeservice.dto.finapi.ExchangeRequest;
import com.uhbooba.financeservice.service.finapi.CommonService;
import com.uhbooba.financeservice.service.finapi.DemandDepositService;
import com.uhbooba.financeservice.service.finapi.DepositService;
import com.uhbooba.financeservice.service.finapi.ExchangeService;
import com.uhbooba.financeservice.service.finapi.UserAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("/fin-api")
public class FinApiController {

    private final CommonService commonService;
    private final DemandDepositService demandDepositService;
    private final DepositService depositService;
    private final ExchangeService exchangeService;
    private final UserAccountService userAccountService;

    // CommonService Methods

    @GetMapping("/common/bank-codes")
    public Mono<JsonNode> getBankCodes() {
        return commonService.getBankCodes();
    }

    // DemandDepositService Methods

    @GetMapping("/demand-deposit/transaction-history/{userKey}/{accountNo}/{transactionUniqueNo}")
    public Mono<JsonNode> getTransactionHistory(
        @PathVariable String userKey,
        @PathVariable String accountNo,
        @PathVariable Long transactionUniqueNo
    ) {
        return demandDepositService.getTransactionHistory(userKey, accountNo, transactionUniqueNo);
    }

    @GetMapping("/demand-deposit/account-detail/{userKey}/{accountNo}")
    public Mono<JsonNode> getAccountDetail(
        @PathVariable String userKey,
        @PathVariable String accountNo
    ) {
        return demandDepositService.getDemandDepositAccount(userKey, accountNo);
    }

    // DepositService Methods

    @PostMapping("/deposit/create-account")
    public Mono<JsonNode> createDepositAccount(@RequestBody DepositAccountCreateRequest dto) {
        return depositService.createDepositAccount(dto);
    }

    @PostMapping("/deposit/create-deposit")
    public Mono<JsonNode> createDeposit(@RequestBody DepositCreateRequest dto) {
        return depositService.createDeposit(dto);
    }

    @GetMapping("/deposit/deposit-products")
    public Mono<JsonNode> getDepositProducts() {
        return depositService.getDepositProducts();
    }

    @GetMapping("/deposit/expiry-interest/{userKey}/{accountNo}")
    public Mono<JsonNode> getDepositExpiryInterest(
        @PathVariable String userKey,
        @PathVariable String accountNo
    ) {
        return depositService.getDepositExpiryInterest(userKey, accountNo);
    }

    @GetMapping("/deposit/early-termination-interest/{userKey}/{accountNo}")
    public Mono<JsonNode> getDepositEarlyTerminationInterest(
        @PathVariable String userKey,
        @PathVariable String accountNo
    ) {
        return depositService.getDepositEarlyTerminationInterest(userKey, accountNo);
    }

    @DeleteMapping("/deposit/delete-account/{userKey}/{accountNo}")
    public Mono<JsonNode> deleteDepositAccount(
        @PathVariable String userKey,
        @PathVariable String accountNo
    ) {
        return depositService.deleteDepositAccount(userKey, accountNo);
    }

    // ExchangeService Methods

    @PostMapping("/exchange/currency")
    public Mono<JsonNode> exchangeCurrency(@RequestBody ExchangeRequest dto) {
        return exchangeService.exchange(dto.accountNo(), dto.exchangeCurrency(),
                                        dto.exchangeAmount());
    }

    @GetMapping("/exchange/rate/{currency}")
    public Mono<JsonNode> getExchangeRate(@PathVariable String currency) {
        return exchangeService.getExchangeRate(currency);
    }

    // UserAccountService Methods

    @GetMapping("/user-account/{userId}")
    public Mono<JsonNode> getUserAccount(@PathVariable Long userId) {
        return userAccountService.getOrCreateUserAccount(userId);
    }
}
