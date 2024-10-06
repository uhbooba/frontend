package com.uhbooba.financeservice.controller.finance;

import static com.uhbooba.financeservice.util.ApiDescriptions.Common.INPUT;
import static com.uhbooba.financeservice.util.ApiDescriptions.Common.OUTPUT;
import static com.uhbooba.financeservice.util.ApiDescriptions.Input.ACCOUNT_NO;
import static com.uhbooba.financeservice.util.ApiDescriptions.Savings.EARLY_SAVINGS_EXPIRE_RESPONSE;
import static com.uhbooba.financeservice.util.ApiDescriptions.Savings.SAVINGS_ACCOUNT_CREATE;
import static com.uhbooba.financeservice.util.ApiDescriptions.Savings.SAVINGS_ACCOUNT_LIST_RESPONSE;
import static com.uhbooba.financeservice.util.ApiDescriptions.Savings.SAVINGS_ACCOUNT_RESPONSE;
import static com.uhbooba.financeservice.util.ApiDescriptions.Savings.SAVINGS_EXPIRE_RESPONSE;
import static com.uhbooba.financeservice.util.ApiDescriptions.Savings.SAVINGS_PRODUCT_RESPONSE;

import com.uhbooba.financeservice.dto.CommonResponse;
import com.uhbooba.financeservice.dto.UserHeaderInfo;
import com.uhbooba.financeservice.dto.finapi.request.savings.SavingsAccountCreateRequest;
import com.uhbooba.financeservice.dto.finapi.request.savings.SavingsCreateRequest;
import com.uhbooba.financeservice.dto.finapi.response.savings.SavingsAccountDeleteResponse;
import com.uhbooba.financeservice.dto.finapi.response.savings.SavingsAccountResponse;
import com.uhbooba.financeservice.dto.finapi.response.savings.SavingsEarlyTerminationInterestResponse;
import com.uhbooba.financeservice.dto.finapi.response.savings.SavingsExpiryInterestResponse;
import com.uhbooba.financeservice.dto.finapi.response.savings.SavingsResponse;
import com.uhbooba.financeservice.service.SavingsService;
import com.uhbooba.financeservice.util.CommonUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@Tag(name = "적금 API", description = "적금 관련 API")
@RequestMapping("/finances/savings")
public class SavingsController {

    private final SavingsService savingsService;

    @PostMapping("/products")
    @Operation(summary = "[사용 X] 적금 상품 만들기")
    public CommonResponse<SavingsResponse> createSavings(
        @Valid @RequestBody SavingsCreateRequest dto
    ) {
        return CommonResponse.ok("적금 상품 생성 완료", savingsService.createSavings(dto));
    }

    @PostMapping("/products/init")
    @Operation(summary = "[사용 주의] 적금 상품 초기 세팅")
    public CommonResponse<?> createSavingsInitSetting(
    ) {
        savingsService.savingsInitSetting();
        return CommonResponse.ok("적금 상품 생성 완료");
    }

    @GetMapping("/products")
    @Operation(summary = "적금 상품 전체 조회", description = INPUT + OUTPUT + SAVINGS_PRODUCT_RESPONSE)
    public CommonResponse<List<SavingsResponse>> getSavingsProducts() {
        return CommonResponse.ok("적금 상품 조회 완료", savingsService.getAllSavings());
    }

    @PostMapping("/accounts")
    @Operation(summary = "적금 계좌 생성", description = INPUT + SAVINGS_ACCOUNT_CREATE + OUTPUT
        + SAVINGS_ACCOUNT_RESPONSE)
    public CommonResponse<SavingsAccountResponse> createSavingsAccount(
        @RequestHeader HttpHeaders headers,
        @Valid @RequestBody SavingsAccountCreateRequest dto
    ) {
        UserHeaderInfo userHeaderInfo = CommonUtil.getUserHeaderInfo(headers);
        return CommonResponse.ok("적금 계좌 생성 완료",
                                 savingsService.createSavingsAccount(userHeaderInfo, dto));
    }

    @GetMapping("/accounts/expiry-interests")
    @Operation(summary = "적금 만기 이자 조회", description = INPUT + ACCOUNT_NO + OUTPUT
        + SAVINGS_EXPIRE_RESPONSE)
    public CommonResponse<SavingsExpiryInterestResponse> getSavingsExpiryInterest(
        @RequestHeader HttpHeaders headers,
        @RequestParam("accountNo") String accountNo
    ) {
        UserHeaderInfo userHeaderInfo = CommonUtil.getUserHeaderInfo(headers);
        return CommonResponse.ok("적금 만기 이자 조회 완료",
                                 savingsService.getSavingsExpiryInterest(userHeaderInfo,
                                                                         accountNo));
    }

    @GetMapping("/accounts/early-termination-interest")
    @Operation(summary = "적금 중도 해지 시 이자 조회", description = INPUT + ACCOUNT_NO + OUTPUT
        + EARLY_SAVINGS_EXPIRE_RESPONSE)
    public CommonResponse<SavingsEarlyTerminationInterestResponse> getSavingsEarlyTerminationInterest(
        @RequestHeader HttpHeaders headers,
        @RequestParam("accountNo") String accountNo
    ) {
        UserHeaderInfo userHeaderInfo = CommonUtil.getUserHeaderInfo(headers);
        return CommonResponse.ok("적금 중도 해지 이자 조회 완료",
                                 savingsService.getSavingsEarlyTerminationInterest(userHeaderInfo,
                                                                                   accountNo));
    }

    @DeleteMapping("/accounts")
    @Operation(summary = "적금 계좌 삭제", description = INPUT + ACCOUNT_NO + OUTPUT)
    public CommonResponse<SavingsAccountDeleteResponse> deleteSavingsAccount(
        @RequestHeader HttpHeaders headers,
        @RequestParam("accountNo") String accountNo
    ) {
        UserHeaderInfo userHeaderInfo = CommonUtil.getUserHeaderInfo(headers);
        return CommonResponse.ok("입출금 계좌 삭제 완료",
                                 savingsService.deleteSavingsAccount(userHeaderInfo, accountNo));
    }

    @GetMapping("/accounts/detail")
    @Operation(summary = "적금 계좌 상세 조회", description = INPUT + ACCOUNT_NO + OUTPUT
        + SAVINGS_ACCOUNT_RESPONSE)
    public CommonResponse<SavingsAccountResponse> getSavingsAccount(
        @RequestHeader HttpHeaders headers,
        @RequestParam("accountNo") String accountNo
    ) {
        UserHeaderInfo userHeaderInfo = CommonUtil.getUserHeaderInfo(headers);
        return CommonResponse.ok("적금 계좌 상세 조회 완료",
                                 savingsService.getSavingsAccount(userHeaderInfo, accountNo));
    }

    @GetMapping("/accounts")
    @Operation(summary = "사용자의 적금 계좌 목록 조회", description = INPUT + OUTPUT
        + SAVINGS_ACCOUNT_LIST_RESPONSE)
    public CommonResponse<List<SavingsAccountResponse>> getSavingsAccounts(
        @RequestHeader HttpHeaders headers
    ) {
        UserHeaderInfo userHeaderInfo = CommonUtil.getUserHeaderInfo(headers);
        return CommonResponse.ok("사용자 적금 계좌 목록 조회 완료",
                                 savingsService.getAllSavingsAccounts(userHeaderInfo));
    }
}
