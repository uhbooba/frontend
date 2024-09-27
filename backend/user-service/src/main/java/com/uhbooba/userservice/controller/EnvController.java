package com.uhbooba.userservice.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@Tag(name = "환경 체크", description = "환경확인 API 입니다.")
public class EnvController {

    private final Environment env;

    @GetMapping("/health-check")
    @Operation(summary = "포트 번호 확인")
    public String status() {
        return String.format("It's Working in User Service On PORT %s",
            env.getProperty("local.server.port"));
    }
}
