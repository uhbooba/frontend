package com.uhbooba.financeservice.service.finapi;

import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.HandlerParamWithHeader;
import com.uhbooba.financeservice.exception.FinOpenApiException;
import com.uhbooba.financeservice.util.finapi.FinOpenApiHandler;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExchangeService {

    private final FinOpenApiHandler finOpenApiHandler;
    private final String BASE_URL = "/edu";
    private final String EXCHANGE_URL = BASE_URL + "/exchange";
    private final String EXCHANGE_RATE_URL = BASE_URL + "/exchangeRate";

    private final String EXCHANGE_RATE_SEARCH_API_NAME = "exchangeRateSearch";
    private final String EXCHANGE_RATE_API_NAME = "exchangeRate";
    private final String ESTIMATE_EXCHANGE_API_NAME = "estimate";
    private final String EXCHANGE_API_NAME = "updateDemandDepositAccountWithdrawal";
    private final String INQUIRE_BANK_CURRENCY_API_NAME = "inquireBankCurrency";

    private JsonNode executeApiRequest(HandlerParamWithHeader param) {
        try {
            return finOpenApiHandler.apiRequest(param);
        } catch(Exception e) {
            log.error("API 요청 실패: {}, 이유: {}", param.apiName(), e.getMessage(), e);

            throw new FinOpenApiException(
                "API 요청 실패: " + param.apiName() + ", 이유: " + e.getMessage());
        }
    }

    public JsonNode getExchangeRate(String currency) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("currency", currency.toUpperCase()); // 대문자

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(EXCHANGE_RATE_URL + "/search")
                                                             .apiName(EXCHANGE_RATE_SEARCH_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return executeApiRequest(param);
    }

    public JsonNode getAllExchangeRate() {
        // 1. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(EXCHANGE_RATE_URL)
                                                             .apiName(EXCHANGE_RATE_API_NAME)
                                                             .build();
        return executeApiRequest(param);
    }

    public JsonNode getExchangeEstimate(
        // 기존 통화
        String fromCurrency,
        // 환전할 통화
        String toCurrency,
        // 금액
        Double amount
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("currency", fromCurrency.toUpperCase()); // 대문자
        requestBody.put("exchangeCurrency", toCurrency.toUpperCase()); // 대문자
        requestBody.put("amount", amount.toString());

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(EXCHANGE_URL + "/estimate")
                                                             .apiName(ESTIMATE_EXCHANGE_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return executeApiRequest(param);
    }

    public JsonNode exchange(
        String accountNo,
        String exchangeCurrency,
        Double exchangeAmount
    ) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("accountNo", accountNo);
        requestBody.put("exchangeCurrency", exchangeCurrency.toUpperCase()); // 대문자
        requestBody.put("exchangeAmount", exchangeAmount.toString());

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(EXCHANGE_URL)
                                                             .apiName(EXCHANGE_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return executeApiRequest(param);
    }

    public JsonNode getBackCurrency() {
        // 1. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(BASE_URL
                                                                      + "/bank/inquireBankCurrency")
                                                             .apiName(
                                                                 INQUIRE_BANK_CURRENCY_API_NAME)
                                                             .build();
        return executeApiRequest(param);
    }
}
