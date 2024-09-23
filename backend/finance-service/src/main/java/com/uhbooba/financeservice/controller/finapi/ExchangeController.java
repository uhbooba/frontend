package com.uhbooba.financeservice.controller.finapi;

import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.ExchangeRequest;
import com.uhbooba.financeservice.service.finapi.ExchangeService;
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

    private final ExchangeService exchangeService;

    @GetMapping("/common/bank-currency")
    @Operation(summary = "통화코드 조회")
    public Mono<JsonNode> getBankCurrency() {
        return exchangeService.getBackCurrency();
    }

    @GetMapping("/exchange/rate")
    @Operation(summary = "환율 조회")
    public Mono<JsonNode> getExchangeRate(@RequestParam("currency") String currency) {
        return exchangeService.getExchangeRate(currency);
    }

    @GetMapping("/exchange/all-rates")
    @Operation(summary = "모든 환율 조회")
    public Mono<JsonNode> getAllExchangeRates() {
        return exchangeService.getAllExchangeRate();
    }

    @PostMapping("/exchange/estimate")
    @Operation(summary = "환전 예상 금액 조회")
    public Mono<JsonNode> getExchangeEstimate(
        @RequestParam("fromCurrency") String fromCurrency,
        @RequestParam("toCurrency") String toCurrency,
        @RequestParam("amount") Double amount
    ) {
        return exchangeService.getExchangeEstimate(fromCurrency, toCurrency, amount);
    }

    @PostMapping("/exchange/currency")
    @Operation(summary = "환전")
    public Mono<JsonNode> exchangeCurrency(@RequestBody ExchangeRequest dto) {
        return exchangeService.exchange(dto.accountNo(), dto.exchangeCurrency(),
                                        dto.exchangeAmount());
    }
}
