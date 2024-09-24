package com.uhbooba.financeservice.controller.finapi;

import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.exchange.ExchangeGetEstimateRequest;
import com.uhbooba.financeservice.dto.finapi.exchange.ExchangeRequest;
import com.uhbooba.financeservice.service.finapi.FinApiExchangeService;
import io.swagger.v3.oas.annotations.Operation;
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
@RequestMapping("/fin-api/exchange")
public class ExchangeController {

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
        @RequestParam String userKey,
        @RequestBody ExchangeRequest dto
    ) {
        return finApiExchangeService.exchange(userKey, dto);
    }
}
