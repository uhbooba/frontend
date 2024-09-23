package com.uhbooba.financeservice.dto.finapi;

import java.util.Map;
import lombok.Builder;
import org.springframework.http.HttpMethod;

public record HandlerParamWithoutHeader(
    String url,
    HttpMethod method,
    Map<String, Object> requestBody
) {

    @Builder
    public HandlerParamWithoutHeader(
        String url,
        HttpMethod method,
        Map<String, Object> requestBody
    ) {
        this.url = url;
        this.method = (method == null) ? HttpMethod.POST : method;  // method 기본값으로 POST 설정
        this.requestBody = requestBody;
    }
}
