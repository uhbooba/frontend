package com.uhbooba.financeservice.service.finapi;

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
public class CommonService {

    private final FinOpenApiHandler finOpenApiHandler;

    public Mono<JsonNode> executeApiRequest(HandlerParamWithHeader param) {
        return finOpenApiHandler.apiRequest(param);
    }

    public Mono<JsonNode> getBankCodes() {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url("/edu/bank/inquireBankCodes")
                                                             .apiName("inquireBankCodes")
                                                             .requestBody(requestBody)
                                                             .build();
        return executeApiRequest(param);
    }
}
