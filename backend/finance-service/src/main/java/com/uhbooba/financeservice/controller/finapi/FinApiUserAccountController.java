package com.uhbooba.financeservice.controller.finapi;

import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.service.finapi.FinApiUserAccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@Slf4j
@Tag(name = "[사용 X]사용자 계정 API", description = "사용자 계정 API 입니다.")
@RequestMapping("/fin-api/user")
public class FinApiUserAccountController {

    private final FinApiUserAccountService finApiUserAccountService;

    @GetMapping("/{userId}")
    @Operation(summary = "사용자 계정 조회")
    public Mono<JsonNode> getUserAccount(@PathVariable("userId") Integer userId) {
        return finApiUserAccountService.getOrCreateUserAccount(userId);
    }
}
