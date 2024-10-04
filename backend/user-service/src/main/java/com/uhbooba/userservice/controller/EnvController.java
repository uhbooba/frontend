package com.uhbooba.userservice.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/env")
@Tag(name = "환경 체크", description = "환경확인 API 입니다.")
public class EnvController {

    private final Environment env;

    @GetMapping("/health-check")
    @Operation(summary = "포트 번호 확인")
    public String status() {
        return String.format("It's Working in User Service On PORT %s",
            env.getProperty("local.server.port"));
    }

    @GetMapping("/header-check")
    @Operation(summary = "사용자 정의 헤더 확인")
    public String getHeader(
        @RequestHeader(value = "X-UserId") String userId,
        @RequestHeader(value = "X-Username") String username,
        @RequestHeader(value = "X-Name") String name) {

        StringBuilder response = new StringBuilder("HTTP Headers:\n");

        name = URLDecoder.decode(name, StandardCharsets.UTF_8);

        log.info("Header: X-UserId = {}", userId);
        log.info("Header: X-Username = {}", username);
        log.info("Header: X-Name = {}", name);

        response.append("X-UserId: ").append(userId).append("\n");
        response.append("X-Username: ").append(username).append("\n");
        response.append("X-Name: ").append(name).append("\n");

        return response.toString();
    }
}
