package com.uhbooba.financeservice.controller.finance;

import com.uhbooba.financeservice.dto.UserHeaderInfo;
import com.uhbooba.financeservice.service.UserAccountService;
import com.uhbooba.financeservice.util.CommonUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@Tag(name = "사용자 계정(금융 API 상) API", description = "사용자 계정(금융 API 상) 관련 API")
@RequestMapping("/finances/users")
public class UserAccountController {

    private final UserAccountService userAccountService;

    @GetMapping("/account")
    @Operation(summary = "금융 API 사용자 계정 생성 또는 조회", description = "회원가입 시 여기로 요청 보내기")
    public void getUserAccount(
        @RequestHeader HttpHeaders headers
    ) {
        UserHeaderInfo userHeaderInfo = CommonUtil.getUserHeaderInfo(headers);
        userAccountService.checkOrCreateUserAccount(userHeaderInfo);
    }
}
