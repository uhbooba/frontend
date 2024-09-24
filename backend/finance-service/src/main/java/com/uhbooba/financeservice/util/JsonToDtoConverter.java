package com.uhbooba.financeservice.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class JsonToDtoConverter {

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * 제너릭 메서드 : monoJsonNode -> list로 변환
     *
     * @param monoJsonNode
     * @param typeReference
     * @param <T>
     * @return
     */
    public <T> Mono<List<T>> convertToList(
        Mono<JsonNode> monoJsonNode,
        TypeReference<List<T>> typeReference
    ) {
        return monoJsonNode.map(jsonNode -> objectMapper.convertValue(jsonNode, typeReference));
    }

    /**
     * 제너릭 메서드: JsonNode를 특정 DTO 객체로 변환
     *
     * @param monoJsonNode
     * @param clazz
     * @param <T>
     * @return
     */
    public <T> Mono<T> convertToObject(
        Mono<JsonNode> monoJsonNode,
        Class<T> clazz
    ) {
        return monoJsonNode.map(jsonNode -> objectMapper.convertValue(jsonNode, clazz));
    }
}
