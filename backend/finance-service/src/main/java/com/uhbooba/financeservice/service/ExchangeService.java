package com.uhbooba.financeservice.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.service.finapi.FinApiExchangeService;
import com.uhbooba.financeservice.util.JsonToDtoConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExchangeService {

    private final FinApiExchangeService finApiExchangeService;
    private final JsonToDtoConverter jsonToDtoConverter;

    public Mono<JsonNode> getExchangeRate() {
        return null;
    }
}
