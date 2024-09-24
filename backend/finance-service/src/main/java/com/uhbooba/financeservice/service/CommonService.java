package com.uhbooba.financeservice.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.response.BankCodeResponse;
import com.uhbooba.financeservice.service.finapi.FinApiCommonService;
import com.uhbooba.financeservice.util.JsonToDtoConverter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommonService {

    private final FinApiCommonService finApiCommonService;
    private final JsonToDtoConverter jsonToDtoConverter;

    /**
     * bank code 조회
     *
     * @return List<BankCodeResponse>
     */
    public Mono<List<BankCodeResponse>> getBankCodes() {
        Mono<JsonNode> bankCodes = finApiCommonService.getBankCodes();

        return jsonToDtoConverter.convertToList(bankCodes,
                                                new TypeReference<List<BankCodeResponse>>() {});
    }
}
