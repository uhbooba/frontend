package com.uhbooba.financeservice.controller.finance;

import static com.uhbooba.financeservice.util.ApiDescriptions.Common.INPUT;
import static com.uhbooba.financeservice.util.ApiDescriptions.Common.OUTPUT;
import static com.uhbooba.financeservice.util.ApiDescriptions.Exchange.EXCHANGE_ESTIMATE_REQ;
import static com.uhbooba.financeservice.util.ApiDescriptions.Exchange.EXCHANGE_ESTIMATE_RES;
import static com.uhbooba.financeservice.util.ApiDescriptions.Exchange.EXCHANGE_RATE_RESPONSE;
import static com.uhbooba.financeservice.util.ApiDescriptions.Exchange.EXCHANGE_REQ;
import static com.uhbooba.financeservice.util.ApiDescriptions.Exchange.EXCHANGE_RES;
import static com.uhbooba.financeservice.util.ApiDescriptions.Input.CURRENCY;

import com.uhbooba.financeservice.dto.CommonResponse;
import com.uhbooba.financeservice.dto.UserHeaderInfo;
import com.uhbooba.financeservice.dto.finapi.request.exchange.ExchangeGetEstimateRequest;
import com.uhbooba.financeservice.dto.finapi.request.exchange.ExchangeRequest;
import com.uhbooba.financeservice.dto.finapi.request.exchange.ForeignCurrencyDemandDepositCreateRequest;
import com.uhbooba.financeservice.dto.finapi.response.exchange.BankCurrencyResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ExchangeEstimateResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ExchangeRateResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ExchangeResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ForeignCurrencyAccountResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ForeignCurrencyProductResponse;
import com.uhbooba.financeservice.service.ExchangeService;
import com.uhbooba.financeservice.util.CommonUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
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
    @Operation(summary = "환율 조회", description = INPUT + CURRENCY + OUTPUT + EXCHANGE_RATE_RESPONSE)
    public CommonResponse<ExchangeRateResponse> getExchangeRate(
        @RequestParam("currency") String currency
    ) {
        return CommonResponse.ok("환율 조회 성공", exchangeService.getExchangeRate(currency));
    }

    @PostMapping("/estimates")
    @Operation(summary = "환전 예상 금액 조회", description = INPUT + EXCHANGE_ESTIMATE_REQ + OUTPUT
        + EXCHANGE_ESTIMATE_RES)
    public CommonResponse<ExchangeEstimateResponse> getExchangeEstimate(
        @Valid @RequestBody ExchangeGetEstimateRequest exchangeGetEstimateRequest
    ) {
        return CommonResponse.ok("환전 예상 금액 조회 성공",
                                 exchangeService.getExchangeEstimate(exchangeGetEstimateRequest));
    }

    @PostMapping("/exchange")
    @Operation(summary = "환전", description = INPUT + EXCHANGE_REQ + OUTPUT + EXCHANGE_RES)
    public CommonResponse<ExchangeResponse> exchangeCurrency(
        @RequestHeader HttpHeaders headers,
        @Valid @RequestBody ExchangeRequest dto
    ) {
        UserHeaderInfo userHeaderInfo = CommonUtil.getUserHeaderInfo(headers);
        return CommonResponse.ok("환전 성공", exchangeService.doExchange(userHeaderInfo, dto));
    }

    @PostMapping("/products")
    @Operation(summary = "[사용 X] 외화 상품 만들기")
    public CommonResponse<ForeignCurrencyProductResponse> exchangeProducts(
        @RequestBody ForeignCurrencyDemandDepositCreateRequest request
    ) {
        return CommonResponse.ok("외화 상품 만들기 성공",
                                 exchangeService.createForeignCurrencyDemandDeposit(request));
    }

    @GetMapping("/products")
    @Operation(summary = "[사용 X] 외화 상품 조회")
    public CommonResponse<List<ForeignCurrencyProductResponse>> getExchangeProducts(
    ) {
        return CommonResponse.ok("외화 상품 조회 성공",
                                 exchangeService.getForeignCurrencyDemandDepositList());
    }

    @PostMapping("/accounts")
    @Operation(summary = "[사용 X] 외화 계좌 만들기")
    public CommonResponse<ForeignCurrencyAccountResponse> exchangeAccount(
        @RequestParam("userId") Integer userId
    ) {
        return CommonResponse.ok("외화 계좌 만들기 성공",
                                 exchangeService.createForeignCurrencyDemandDepositAccount(userId));
    }

    @GetMapping("/accounts")
    @Operation(summary = "[사용 X] 외화 계좌 조회")
    public CommonResponse<List<ForeignCurrencyAccountResponse>> getExchangeAccounts(
        @RequestParam("userId") Integer userId
    ) {
        return CommonResponse.ok("외화 계좌 조회 성공",
                                 exchangeService.getForeignCurrencyDemandDepositAccountList(
                                     userId));
    }
}
