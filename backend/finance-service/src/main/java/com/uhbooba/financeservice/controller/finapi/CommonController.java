package com.uhbooba.financeservice.controller.finapi;

import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.service.finapi.CommonService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/fin-api/common")
public class CommonController {

    private final CommonService commonService;

    @GetMapping("/bank-codes")
    @Operation(summary = "bank code 가져오기")
    public Mono<JsonNode> getBankCodes() {
        return commonService.getBankCodes();
    }
}
