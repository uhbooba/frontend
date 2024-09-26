package com.uhbooba.financeservice.controller.finance;

import com.uhbooba.financeservice.dto.finapi.request.deposit.DepositAccountCreateRequest;
import com.uhbooba.financeservice.dto.finapi.request.deposit.DepositCreateRequest;
import com.uhbooba.financeservice.dto.finapi.response.deposit.DepositAccountDeleteResponse;
import com.uhbooba.financeservice.dto.finapi.response.deposit.DepositAccountResponse;
import com.uhbooba.financeservice.dto.finapi.response.deposit.DepositEarlyTerminationInterestResponse;
import com.uhbooba.financeservice.dto.finapi.response.deposit.DepositExpiryInterestResponse;
import com.uhbooba.financeservice.dto.finapi.response.deposit.DepositResponse;
import com.uhbooba.financeservice.service.DepositService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@Tag(name = "예금 API", description = "예금 관련 API")
@RequestMapping("/finances/deposits")
public class DepositController {

    private final DepositService depositService;

    @PostMapping("/products")
    @Operation(summary = "예금 상품 만들기")
    public DepositResponse createDeposit(
        @Valid @RequestBody DepositCreateRequest dto
    ) {
        return depositService.createDeposit(dto);
    }

    @GetMapping("/products")
    @Operation(summary = "예금 상품 전체 조회")
    public List<DepositResponse> getDepositProducts() {
        return depositService.getAllDeposits();
    }

    @PostMapping("/accounts")
    @Operation(summary = "예금 계좌 생성")
    public DepositAccountResponse createDepositAccount(
        @RequestParam("userKey") String userKey,
        @Valid @RequestBody DepositAccountCreateRequest dto
    ) {
        return depositService.createDepositAccount(userKey, dto);
    }

    @GetMapping("/accounts/expiry-interests")
    @Operation(summary = "예금 만기 이자 조회")
    public DepositExpiryInterestResponse getDepositExpiryInterest(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return depositService.getDepositExpiryInterest(userKey, accountNo);
    }

    @GetMapping("/accounts/early-termination-interest")
    @Operation(summary = "예금 중도 해지 시 이자 조회")
    public DepositEarlyTerminationInterestResponse getDepositEarlyTerminationInterest(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return depositService.getDepositEarlyTerminationInterest(userKey, accountNo);
    }

    @DeleteMapping("/accounts")
    @Operation(summary = "입출금 계좌 삭제")
    public DepositAccountDeleteResponse deleteDepositAccount(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return depositService.deleteDepositAccount(userKey, accountNo);
    }

    @GetMapping("/accounts/detail")
    @Operation(summary = "예금 계좌 상세 조회")
    public DepositAccountResponse getDepositAccount(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        return depositService.getDepositAccount(userKey, accountNo);
    }

    @GetMapping("/accounts")
    @Operation(summary = "사용자의 예금 계좌 목록 조회")
    public List<DepositAccountResponse> getDepositAccounts(
        @RequestParam("userKey") String userKey
    ) {
        return depositService.getAllDepositAccounts(userKey);
    }
}
