package com.uhbooba.userservice.controller;

import com.uhbooba.userservice.dto.CommonResponse;
import com.uhbooba.userservice.dto.request.SmsRequest;
import com.uhbooba.userservice.dto.request.SmsVerifyRequest;
import com.uhbooba.userservice.service.SmsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sms")
@RequiredArgsConstructor
@Tag(name = "문자 인증", description = "sms API 입니다.")
public class SmsController {

    private final SmsService smsService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "문자 전송")
    public CommonResponse<?> sendSMS(@Valid @RequestBody SmsRequest request) {
        smsService.sendSms(request.phone());
        return CommonResponse.ok("문자를 전송했습니다.");
    }

    @PostMapping("/verify")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "문자 인증")
    public CommonResponse<?> verifySMS(@Valid @RequestBody SmsVerifyRequest request) {
        smsService.verifySms(request.phone(), request.code());
        return CommonResponse.ok("문자 인증에 성공했습니다.");
    }

    @PostMapping("/test")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "문자 전송 test")
    public CommonResponse<?> sendTestSMS(@Valid @RequestBody SmsRequest request) {
        smsService.sendTestSms(request.phone());
        return CommonResponse.ok("문자를 전송했습니다.");
    }

}
