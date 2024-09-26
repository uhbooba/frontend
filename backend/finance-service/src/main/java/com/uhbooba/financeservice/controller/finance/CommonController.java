package com.uhbooba.financeservice.controller.finance;

import com.uhbooba.financeservice.dto.CommonResponse;
import com.uhbooba.financeservice.dto.finapi.response.BankCodeResponse;
import com.uhbooba.financeservice.service.CommonService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@Tag(name = "공통 API", description = "공통 API(은행 코드 조회)")
@RequestMapping("/finances/commons")
public class CommonController {

    private final CommonService commonService;

    @GetMapping("/banks")
    @Operation(summary = "bank code 가져오기")
    public CommonResponse<List<BankCodeResponse>> getBankCodes() {

        return CommonResponse.ok("조회 성공", commonService.getBankCodes());
    }
}
