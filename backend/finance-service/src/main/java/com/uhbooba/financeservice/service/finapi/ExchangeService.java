package com.uhbooba.financeservice.service.finapi;

import static com.uhbooba.financeservice.service.finapi.CommonService.executeApiRequest;
import static com.uhbooba.financeservice.util.finapi.FinApiList.Exchange.*;

import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.HandlerParamWithHeader;
import com.uhbooba.financeservice.util.finapi.FinOpenApiHandler;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExchangeService {

    private final FinOpenApiHandler finOpenApiHandler;

    public Mono<JsonNode> getExchangeRate(String currency) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("currency", currency.toUpperCase()); // 대문자

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_EXCHANGE_RATE_SEARCH_URL)
                                                             .apiName(EXCHANGE_RATE_SEARCH_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return executeApiRequest(param);
    }

    public Mono<JsonNode> getAllExchangeRate() {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(EXCHANGE_RATE_URL)
                                                             .apiName(EXCHANGE_RATE_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return executeApiRequest(param);
    }

    public Mono<JsonNode> getExchangeEstimate(
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
                                                             .url(GET_EXCHANGE_ESTIMATE_URL)
                                                             .apiName(ESTIMATE_EXCHANGE_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return executeApiRequest(param);
    }

    public Mono<JsonNode> exchange(
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

    public Mono<JsonNode> getBackCurrency() {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url(GET_BANK_CURRENCY_URL)
                                                             .apiName(
                                                                 INQUIRE_BANK_CURRENCY_API_NAME)
                                                             .requestBody(requestBody)
                                                             .build();
        return executeApiRequest(param);
    }
}
