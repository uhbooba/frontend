package com.uhbooba.financeservice.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.response.BankCodeResponse;
import com.uhbooba.financeservice.service.finapi.FinApiCommonService;
import com.uhbooba.financeservice.util.JsonToDtoConverter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
    public List<BankCodeResponse> getBankCodes() {
        JsonNode bankCodes = finApiCommonService.getBankCodes()
                                                .block();

        return jsonToDtoConverter.convertToList(bankCodes,
                                                new TypeReference<List<BankCodeResponse>>() {});
    }
}
