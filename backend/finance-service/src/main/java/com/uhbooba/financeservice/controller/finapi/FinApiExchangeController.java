package com.uhbooba.financeservice.controller.finapi;

import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.request.exchange.ExchangeGetEstimateRequest;
import com.uhbooba.financeservice.dto.finapi.request.exchange.ExchangeRequest;
import com.uhbooba.financeservice.dto.finapi.request.exchange.ForeignCurrencyDemandDepositCreateRequest;
import com.uhbooba.financeservice.service.finapi.FinApiExchangeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Tag(name = "[사용 X]환전 및 외환 API", description = "환전 및 외환 API 입니다.")
@RequestMapping("/fin-api/exchange")
public class FinApiExchangeController {

    private final FinApiExchangeService finApiExchangeService;

    @GetMapping("/common/bank-currency")
    @Operation(summary = "통화코드 조회")
    public Mono<JsonNode> getBankCurrency() {
        return finApiExchangeService.getBackCurrency();
    }

    @GetMapping("/exchange/rate")
    @Operation(summary = "환율 조회")
    public Mono<JsonNode> getExchangeRate(@RequestParam("currency") String currency) {
        return finApiExchangeService.getExchangeRate(currency);
    }

    @GetMapping("/exchange/all-rates")
    @Operation(summary = "모든 환율 조회")
    public Mono<JsonNode> getAllExchangeRates() {
        return finApiExchangeService.getAllExchangeRate();
    }

    @PostMapping("/exchange/estimate")
    @Operation(summary = "환전 예상 금액 조회")
    public Mono<JsonNode> getExchangeEstimate(
        @RequestBody ExchangeGetEstimateRequest exchangeGetEstimateRequest
    ) {
        return finApiExchangeService.getExchangeEstimate(exchangeGetEstimateRequest);
    }

    @PostMapping("/exchange/currency")
    @Operation(summary = "환전")
    public Mono<JsonNode> exchangeCurrency(
        @RequestParam("userKey") String userKey,
        @RequestBody ExchangeRequest dto
    ) {
        return finApiExchangeService.exchange(userKey, dto);
    }

    @PostMapping("/exchange/products")
    @Operation(summary = "외화 상품 만들기")
    public Mono<JsonNode> exchangeProducts(
        @RequestBody ForeignCurrencyDemandDepositCreateRequest request
    ) {
        return finApiExchangeService.createForeignCurrencyDemandDeposit(request);
    }

    @GetMapping("/excahnge/products")
    @Operation(summary = "외화 상품 조회")
    public Mono<JsonNode> getExchangeProducts(
    ) {
        return finApiExchangeService.getForeignCurrencyDemandDepositList();
    }

    @PostMapping("/exchange/accounts")
    @Operation(summary = "외화 계좌 만들기")
    public Mono<JsonNode> exchangeAccount(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountTypeUniqueNo") String accountTypeUniqueNo,
        @RequestParam("currency") String currency
    ) {
        return finApiExchangeService.createForeignCurrencyDemandDepositAccount(userKey,
                                                                               accountTypeUniqueNo,
                                                                               currency);
    }

    @GetMapping("/exchange/accounts")
    @Operation(summary = "외화 계좌 조회")
    public Mono<JsonNode> getExchangeAccounts(
        @RequestParam("userKey") String userKey
    ) {
        return finApiExchangeService.getForeignCurrencyDemandDepositAccountList(userKey);
    }
}
