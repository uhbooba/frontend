package com.uhbooba.financeservice.controller.finance;

import com.uhbooba.financeservice.dto.CommonResponse;
import com.uhbooba.financeservice.dto.UserHeaderInfo;
import com.uhbooba.financeservice.dto.UtilityPaymentRequest;
import com.uhbooba.financeservice.service.UtilityPaymentService;
import com.uhbooba.financeservice.util.CommonUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@Tag(name = "공과금 API", description = "공과금 API")
@RequestMapping("/finances/utilities")
public class UtilityPaymentController {

    private final UtilityPaymentService utilityPaymentService;

    @PostMapping("/payment")
    @Operation(summary = "공과금 납부")
    public CommonResponse<?> payUtilityPayment(
        @RequestHeader HttpHeaders headers,
        @Valid @RequestBody UtilityPaymentRequest request
    ) {
        UserHeaderInfo userHeaderInfo = CommonUtil.getUserHeaderInfo(headers);
        utilityPaymentService.payUtilities(userHeaderInfo, request);
        return CommonResponse.ok("공과금 납부 성공");
    }

    @PostMapping("/init/setting")
    @Operation(summary = "딱 한 번만 사용하시죠(초기 세팅용)")
    public CommonResponse<?> initUtilityPaymentSetting() {
        utilityPaymentService.initValueForUtilities();
        return CommonResponse.ok("초기 설정 완료");
    }
}
