package com.uhbooba.financeservice.util.finapi;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.uhbooba.financeservice.dto.finapi.HandlerParamWithHeader;
import com.uhbooba.financeservice.dto.finapi.HandlerParamWithoutHeader;
import com.uhbooba.financeservice.exception.FinOpenApiException;
import java.time.Duration;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Component
@RequiredArgsConstructor
@Slf4j
public class FinOpenApiHandler {

    private final FinCommonHeader finCommonHeader;
    private final RestTemplate restTemplate;
    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    @Value("${finopenapi.key}")
    private String apiKey;

    @Value("${finopenapi.base-url}")
    private String baseUrl;

    /**
     * 공통 헤더 필요없는 경우 사용
     *
     * @param url         url
     * @param method      http method
     * @param requestBody body
     * @return JsonNode
     * @throws JsonProcessingException
     */
    public Mono<JsonNode> apiRequest(
        HandlerParamWithoutHeader param
    ) {
        String url = param.url();
        HttpMethod method = param.method();
        Map<String, Object> requestBody = param.requestBody();

        // HTTP 바디에 공통 API key 추가
        requestBody.put("apiKey", apiKey);

        return webClient.method(method)
                        .uri(baseUrl + url)
                        .bodyValue(requestBody)
                        .retrieve()
                        .bodyToMono(String.class)
                        .timeout(Duration.ofSeconds(5)) // 5초 타임아웃 설정
                        .map(this::parseJsonResponse)
                        .subscribeOn(Schedulers.boundedElastic()) // I/O 작업을 위한 스레드 풀
                        .onErrorResume(throwable -> {
                            log.error("API 요청 실패: {}", throwable.getMessage(), throwable);
                            return Mono.error(
                                new FinOpenApiException("API 요청 실패 : " + param.url()));
                        });

    }

    public JsonNode apiRequestRT(
        HandlerParamWithoutHeader param
    ) throws JsonProcessingException {
        String url = param.url();
        HttpMethod method = param.method();
        Map<String, Object> requestBody = param.requestBody();

        // HTTP 헤더 설정
        HttpHeaders headers = createHeader();

        // HTTP 바디에 공통 API key 추가
        requestBody.put("apiKey", apiKey);

        // 요청 보내고 응답 받기
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> responseEntity = restTemplate.exchange(baseUrl + url, method,
                                                                      requestEntity, String.class);

        // 변환하기
        return parseJsonResponse(responseEntity);
    }

    /**
     * 공통헤더가 필요한 경우 사용
     *
     * @param param 파라미터 HandlerParamWithHeader
     * @return JsonNode
     */
    public Mono<JsonNode> apiRequest(
        HandlerParamWithHeader param
    ) {
        String url = param.url();
        String apiName = param.apiName();
        HttpMethod method = param.method();
        Map<String, Object> requestBody = param.requestBody();
        String userKey = param.userKey();

        // HTTP 바디에 공통 헤더 추가
        String headerJson = null;
        JsonNode headerNode = null;
        try {
            // fin 공통헤더 만들기
            headerJson = objectMapper.writeValueAsString(finCommonHeader.createHeader(apiName));
            headerNode = objectMapper.readTree(headerJson);
        } catch(JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        // userkey가 필요한 api라면
        if(userKey != null) {
            ((ObjectNode) headerNode).put("userKey", userKey);
        }

        requestBody.put("Header", headerNode);

        return webClient.method(method)
                        .uri(baseUrl + url)
                        .bodyValue(requestBody)
                        .retrieve()
                        .bodyToMono(String.class)
                        .timeout(Duration.ofSeconds(5)) // 5초 타임아웃 설정
                        .map(this::parseJsonResponse)
                        .subscribeOn(Schedulers.boundedElastic()) // I/O 작업을 위한 스레드 풀
                        .onErrorResume(throwable -> {
                            log.error("API 요청 실패: {}", throwable.getMessage(), throwable);
                            return Mono.error(
                                new FinOpenApiException("API 요청 실패: " + param.apiName()));
                        });
    }

    /**
     * header 생성
     *
     * @return HttpHeader
     */
    public HttpHeaders createHeader() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    /**
     * response -> jsonNode 변환
     *
     * @param responseEntity
     * @return
     * @throws JsonProcessingException
     */
    public JsonNode parseJsonResponse(ResponseEntity<String> responseEntity)
        throws JsonProcessingException {
        // 응답 200번 대 아니면 에러 처리
        if(!responseEntity.getStatusCode()
                          .is2xxSuccessful()) {
            throw new FinOpenApiException();
        }
        return objectMapper.readTree(responseEntity.getBody());
    }

    // 응답을 JsonNode로 변환
    private JsonNode parseJsonResponse(String responseBody) {
        try {
            return objectMapper.readTree(responseBody);
        } catch(JsonProcessingException e) {
            throw new RuntimeException("Error parsing JSON response", e);
        }
    }

    /**
     * jsonNode 에서 키에 대한 값 반환
     *
     * @param responseJson responseJson
     * @param key          key
     * @return 값
     */
    public String getValueByKey(
        JsonNode responseJson,
        String key
    ) {
        JsonNode valueNode = responseJson.get(key);
        if(valueNode != null && !valueNode.isNull()) {
            return valueNode.asText();
        } else {
            return null;
        }
    }

}
