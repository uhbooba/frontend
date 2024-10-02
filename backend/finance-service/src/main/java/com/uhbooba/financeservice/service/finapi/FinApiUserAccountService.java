package com.uhbooba.financeservice.service.finapi;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.HandlerParamWithoutHeader;
import com.uhbooba.financeservice.exception.FinOpenApiException;
import com.uhbooba.financeservice.util.finapi.FinOpenApiHandler;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class FinApiUserAccountService {

    private final FinOpenApiHandler finOpenApiHandler;
    private final String baseUrl = "/member";

    /**
     * 사용자 계정을 get or create
     *
     * @param userId user pk
     * @return
     * @throws
     */
    public Mono<JsonNode> getOrCreateUserAccount(Integer userId) {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        // 1.1 email 만들기
        String email = generateUniqueEmail(userId);
        requestBody.put("userId", email);

        // 2. API 요청
        HandlerParamWithoutHeader param = HandlerParamWithoutHeader.builder()
                                                                   .url(baseUrl)
                                                                   .requestBody(requestBody)
                                                                   .build();

        return finOpenApiHandler.apiRequest(param)
                                .onErrorResume(Exception.class, e -> {
                                    HandlerParamWithoutHeader searchParam = HandlerParamWithoutHeader.builder()
                                                                                                     .url(
                                                                                                         baseUrl
                                                                                                             + "/search")
                                                                                                     .requestBody(
                                                                                                         requestBody)
                                                                                                     .build();
                                    return finOpenApiHandler.apiRequest(searchParam)
                                                            .onErrorResume(Exception.class, ex -> {
                                                                return Mono.error(
                                                                    new FinOpenApiException(
                                                                        "API 요청 실패: 계좌 검색, 이유: "
                                                                            + ex.getMessage()));
                                                            });
                                });
    }

    public JsonNode getOrCreateUserAccountWithRT(Integer userId) throws JsonProcessingException {
        // 1. 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        // 1.1 email 만들기
        String email = generateUniqueEmail(userId);
        requestBody.put("userId", email);

        // 2. api 요청
        JsonNode jsonNode;
        HandlerParamWithoutHeader param;
        try {
            param = HandlerParamWithoutHeader.builder()
                                             .url(baseUrl)
                                             .requestBody(requestBody)
                                             .build();
            jsonNode = finOpenApiHandler.apiRequestRT(param);
        } catch(HttpClientErrorException e) {
            param = HandlerParamWithoutHeader.builder()
                                             .url(baseUrl + "/search")
                                             .requestBody(requestBody)
                                             .build();
            // API 에서 4xx 에러가 발생한 경우 예외 처리(400 에러로 들어옴)
            jsonNode = finOpenApiHandler.apiRequestRT(param);
        } catch(Exception e) {
            // 일반적인 예외 처리
            throw new FinOpenApiException(e.getMessage());
        }
        return jsonNode;
    }

    /**
     * 유니크한 이메일 만들기
     *
     * @param userId user id
     * @return email
     */
    private String generateUniqueEmail(Integer userId) {
        return "user" + userId + "@uhbooba424.com";
    }
}
