package com.uhbooba.financeservice.dto.finapi;

import java.util.Map;
import lombok.Builder;
import org.springframework.http.HttpMethod;

public record HandlerParamWithHeader(
    String url,
    String apiName,
    HttpMethod method,
    Map<String, Object> requestBody,
    String userKey
) {

    @Builder
    public HandlerParamWithHeader(
        String url,
        String apiName,
        HttpMethod method,
        Map<String, Object> requestBody,
        String userKey
    ) {
        // 기본값 설정
        this.url = url;
        this.apiName = apiName;
        this.method = (method == null) ? HttpMethod.POST : method;  // method 기본값으로 POST 설정
        this.requestBody = requestBody;
        this.userKey = userKey;
    }
}