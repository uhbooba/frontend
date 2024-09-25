package com.uhbooba.financeservice.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class JsonToDtoConverter {

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * 제너릭 메서드 : monoJsonNode -> list로 변환
     *
     * @param jsonNode
     * @param typeReference
     * @param <T>
     * @return
     */
    public <T> List<T> convertToList(
        JsonNode jsonNode,
        TypeReference<List<T>> typeReference
    ) {
        return objectMapper.convertValue(jsonNode, typeReference);
    }

    /**
     * 제너릭 메서드: JsonNode를 특정 DTO 객체로 변환
     *
     * @param monoJsonNode
     * @param clazz
     * @param <T>
     * @return
     */
    public <T> T convertToObject(
        JsonNode jsonNode,
        Class<T> clazz
    ) {
        return objectMapper.convertValue(jsonNode, clazz);
    }
}
