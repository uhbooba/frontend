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
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommonService {

    public static FinOpenApiHandler finOpenApiHandler;

    public static Mono<JsonNode> executeApiRequest(HandlerParamWithHeader param) {
        return finOpenApiHandler.apiRequest(param)
                                .onErrorResume(e -> {
                                    log.error("API 요청 실패: {}, 이유: {}", param.apiName(),
                                              e.getMessage(), e);
                                    return Mono.error(new FinOpenApiException(
                                        "API 요청 실패: " + param.apiName() + ", 이유: "
                                            + e.getMessage()));
                                });
    }

    public Mono<JsonNode> getBankCodes() {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();

        // 2. api 요청
        HandlerParamWithHeader param = HandlerParamWithHeader.builder()
                                                             .url("/edu/bank/inquireBankCurrency")
                                                             .apiName("inquireBankCurrency")
                                                             .requestBody(requestBody)
                                                             .build();
        return executeApiRequest(param);
    }
}
