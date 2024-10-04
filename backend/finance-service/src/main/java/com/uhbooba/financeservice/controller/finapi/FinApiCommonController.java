package com.uhbooba.financeservice.controller.finapi;

import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.service.finapi.FinApiCommonService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@Slf4j
@Tag(name = "[사용 X]공통", description = "은행 코드 컨트롤러")
@RequestMapping("/fin-api/common")
public class FinApiCommonController {

    private final FinApiCommonService finApiCommonService;

    @GetMapping("/bank-codes")
    @Operation(summary = "bank code 가져오기")
    public Mono<JsonNode> getBankCodes() {
        return finApiCommonService.getBankCodes();
    }
}
