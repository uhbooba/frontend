package com.uhbooba.financeservice.controller.finance;

import com.uhbooba.financeservice.dto.CommonResponse;
import com.uhbooba.financeservice.dto.finapi.request.exchange.ExchangeGetEstimateRequest;
import com.uhbooba.financeservice.dto.finapi.request.exchange.ExchangeRequest;
import com.uhbooba.financeservice.dto.finapi.request.exchange.ForeignCurrencyDemandDepositCreateRequest;
import com.uhbooba.financeservice.dto.finapi.response.exchange.BankCurrencyResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ExchangeEstimateResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ExchangeRateResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ExchangeResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ForeignCurrencyAccountCreateResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ForeignCurrencyAccountResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ForeignCurrencyProductResponse;
import com.uhbooba.financeservice.service.ExchangeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@Tag(name = "환전 및 외환 API", description = "환전 및 외환 관련 API")
@RequestMapping("/finances/exchanges")
public class ExchangeController {

    private final ExchangeService exchangeService;

    @GetMapping("/bank-currencies")
    @Operation(summary = "통화코드 조회")
    public CommonResponse<List<BankCurrencyResponse>> getBankCurrency() {
        return CommonResponse.ok("완료", exchangeService.getBackCurrency());
    }

    @GetMapping("/rates/detail")
    @Operation(summary = "환율 조회")
    public ExchangeRateResponse getExchangeRate(
        @RequestParam("currency") String currency
    ) {
        return exchangeService.getExchangeRate(currency);
    }

    @PostMapping("/estimates")
    @Operation(summary = "환전 예상 금액 조회")
    public ExchangeEstimateResponse getExchangeEstimate(
        @Valid @RequestBody ExchangeGetEstimateRequest exchangeGetEstimateRequest
    ) {
        return exchangeService.getExchangeEstimate(exchangeGetEstimateRequest);
    }

    @PostMapping("/exchange")
    @Operation(summary = "환전")
    public ExchangeResponse exchangeCurrency(
        @RequestParam("userKey") String userKey,
        @Valid @RequestBody ExchangeRequest dto
    ) {
        return exchangeService.doExchange(userKey, dto);
    }

    @PostMapping("/products")
    @Operation(summary = "외화 상품 만들기")
    public ForeignCurrencyProductResponse exchangeProducts(
        @RequestBody ForeignCurrencyDemandDepositCreateRequest request
    ) {
        return exchangeService.createForeignCurrencyDemandDeposit(request);
    }

    @GetMapping("/products")
    @Operation(summary = "외화 상품 조회")
    public List<ForeignCurrencyProductResponse> getExchangeProducts(
    ) {
        return exchangeService.getForeignCurrencyDemandDepositList();
    }

    @PostMapping("/accounts")
    @Operation(summary = "외화 계좌 만들기")
    public ForeignCurrencyAccountCreateResponse exchangeAccount(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountTypeUniqueNo") String accountTypeUniqueNo,
        @RequestParam("currency") String currency
    ) {
        if(accountTypeUniqueNo.length() > 20) {
            throw new IllegalArgumentException("금융 상품 고유 번호는 최대 20자리입니다.");
        }
        if(currency.length() > 20) {
            throw new IllegalArgumentException("통화코드는 최대 20자리입니다.");
        }
        return exchangeService.createForeignCurrencyDemandDepositAccount(userKey,
                                                                         accountTypeUniqueNo,
                                                                         currency);
    }

    @GetMapping("/accounts")
    @Operation(summary = "외화 계좌 조회")
    public List<ForeignCurrencyAccountResponse> getExchangeAccounts(
        @RequestParam("userKey") String userKey
    ) {
        return exchangeService.getForeignCurrencyDemandDepositAccountList(userKey);
    }
}
