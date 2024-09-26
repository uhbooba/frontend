package com.uhbooba.financeservice.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
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
import com.uhbooba.financeservice.service.finapi.FinApiExchangeService;
import com.uhbooba.financeservice.util.JsonToDtoConverter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExchangeService {

    private final FinApiExchangeService finApiExchangeService;
    private final JsonToDtoConverter jsonToDtoConverter;

    public ExchangeRateResponse getExchangeRate(String currency) {
        JsonNode exchangeRate = finApiExchangeService.getExchangeRate(currency)
                                                     .block();
        return jsonToDtoConverter.convertToObject(exchangeRate, ExchangeRateResponse.class);
    }

    // 안 쓸 로직인듯
    public Object getAllExchangeRate() {
        return null;
    }

    public ExchangeEstimateResponse getExchangeEstimate(
        ExchangeGetEstimateRequest estimateRequest
    ) {
        JsonNode exchangeEstimate = finApiExchangeService.getExchangeEstimate(estimateRequest)
                                                         .block();
        return jsonToDtoConverter.convertToObject(exchangeEstimate, ExchangeEstimateResponse.class);
    }

    public ExchangeResponse doExchange(
        String userKey,
        ExchangeRequest exchangeRequest
    ) {
        JsonNode exchangeResult = finApiExchangeService.exchange(userKey, exchangeRequest)
                                                       .block();
        return jsonToDtoConverter.convertToObject(exchangeResult, ExchangeResponse.class);
    }

    public List<BankCurrencyResponse> getBackCurrency() {
        JsonNode backCurrency = finApiExchangeService.getBackCurrency()
                                                     .block();
        return jsonToDtoConverter.convertToList(backCurrency,
                                                new TypeReference<List<BankCurrencyResponse>>() {});
    }

    public ForeignCurrencyProductResponse createForeignCurrencyDemandDeposit(
        ForeignCurrencyDemandDepositCreateRequest request
    ) {
        JsonNode createdProduct = finApiExchangeService.createForeignCurrencyDemandDeposit(request)
                                                       .block();
        return jsonToDtoConverter.convertToObject(createdProduct,
                                                  ForeignCurrencyProductResponse.class);
    }

    public List<ForeignCurrencyProductResponse> getForeignCurrencyDemandDepositList(

    ) {
        JsonNode list = finApiExchangeService.getForeignCurrencyDemandDepositList()
                                             .block();
        return jsonToDtoConverter.convertToList(list,
                                                new TypeReference<List<ForeignCurrencyProductResponse>>() {});
    }

    public ForeignCurrencyAccountCreateResponse createForeignCurrencyDemandDepositAccount(
        String userKey,
        String accountTypeUniqueNo,
        String currency
    ) {
        JsonNode account = finApiExchangeService.createForeignCurrencyDemandDepositAccount(userKey,
                                                                                           accountTypeUniqueNo,
                                                                                           currency)
                                                .block();
        return jsonToDtoConverter.convertToObject(account,
                                                  ForeignCurrencyAccountCreateResponse.class);
    }

    public List<ForeignCurrencyAccountResponse> getForeignCurrencyDemandDepositAccountList(
        String userKey
    ) {
        JsonNode list = finApiExchangeService.getForeignCurrencyDemandDepositAccountList(userKey)
                                             .block();
        return jsonToDtoConverter.convertToList(list,
                                                new TypeReference<List<ForeignCurrencyAccountResponse>>() {});
    }
}
