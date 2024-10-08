package com.uhbooba.userservice.controller;

import com.uhbooba.userservice.dto.CommonResponse;
import com.uhbooba.userservice.dto.request.SmsRequest;
import com.uhbooba.userservice.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/notification")
@Tag(name = "알람 체크", description = "알람 API 입니다.")
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "알람 전송")
    public String triggerEvent(@RequestBody String token) {
        notificationService.sendPushNotification(token, "이벤트 알림", "사용자가 행동을 수행했습니다.");
        return "알림 전송 완료";
    }
}

