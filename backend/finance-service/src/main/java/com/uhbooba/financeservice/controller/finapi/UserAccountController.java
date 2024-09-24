package com.uhbooba.financeservice.controller.finapi;

import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.service.finapi.FinApiUserAccountService;
import io.swagger.v3.oas.annotations.Operation;
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
@RequestMapping("/fin-api/user")
public class UserAccountController {

    private final FinApiUserAccountService finApiUserAccountService;

    @GetMapping("/{userId}")
    @Operation(summary = "사용자 계정 조회")
    public Mono<JsonNode> getUserAccount(@PathVariable("userId") Long userId) {
        return finApiUserAccountService.getOrCreateUserAccount(userId);
    }
}
