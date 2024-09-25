package com.uhbooba.financeservice.controller.finance;

import com.uhbooba.financeservice.dto.CommonResponse;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositCreateRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositDepositAccountRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositGetTransactionRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositGetTransactionsRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositTransferAccountRequest;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositAccountBalanceResponse;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositAccountHolderResponse;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositAccountResponse;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositDepositResponse;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositResponse;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositTransferResponse;
import com.uhbooba.financeservice.dto.finapi.response.transaction.TransactionListResponse;
import com.uhbooba.financeservice.dto.finapi.response.transaction.TransactionResponse;
import com.uhbooba.financeservice.service.DemandDepositService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@Tag(name = "수시 입출금 API", description = "수시 입출금 관련 API")
@RequestMapping("/finances/demand-deposits")
public class DemandDepositController {

    private final DemandDepositService demandDepositService;

    @PostMapping("/products")
    @Operation(summary = "입출금 상품 생성")
    public CommonResponse<DemandDepositResponse> createDemandDeposit(
        @Valid @RequestBody DemandDepositCreateRequest createRequest
    ) {
        return CommonResponse.ok("입출금 상품 생성 완료",
                                 demandDepositService.createDemandDeposit(createRequest));
    }

    @GetMapping("/products")
    @Operation(summary = "입출금 상품 전체 조회")
    public CommonResponse<List<DemandDepositResponse>> getDemandDeposits(
    ) {
        return CommonResponse.ok("완료", demandDepositService.getAllDemandDeposits());
    }

    @PostMapping("/accounts")
    @Operation(summary = "입출금 계좌 생성")
    public CommonResponse<DemandDepositAccountResponse> createDemandDepositAccount(
        //        @RequestParam("userKey") String userKey,
        //        @RequestParam("accountTypeUniqueNo") String accountTypeUniqueNo,
        @RequestParam("userId") Integer userId
    ) {
        return CommonResponse.ok("완료", demandDepositService.createDemandDepositAccount(userId));
    }

    @GetMapping("/accounts/detail")
    @Operation(summary = "입출금계좌 조회")
    public CommonResponse<DemandDepositAccountResponse> getAccountDetail(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        if(accountNo.length() > 16) {
            throw new IllegalArgumentException("계좌 번호는 16글자입니다.");
        }
        return CommonResponse.ok("완료",
                                 demandDepositService.getDemandDepositAccount(userKey, accountNo));
    }

    @GetMapping("/accounts")
    @Operation(summary = "사용자의 모든 입출금계좌 조회")
    public CommonResponse<List<DemandDepositResponse>> getAllAccounts(
        @RequestParam("userKey") String userKey
    ) {
        return CommonResponse.ok("완료", demandDepositService.getAllDemandDepositAccounts(userKey));
    }

    @GetMapping("/accounts/holder")
    @Operation(summary = "입출금계좌 소유자 이름 조회")
    public CommonResponse<DemandDepositAccountHolderResponse> getAccountHolderName(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        if(accountNo.length() > 16) {
            throw new IllegalArgumentException("계좌 번호는 16글자입니다.");
        }
        return CommonResponse.ok("완료",
                                 demandDepositService.getDemandDepositAccountHolderName(userKey,
                                                                                        accountNo));
    }

    @GetMapping("/accounts/balances")
    @Operation(summary = "입출금계좌 잔액 조회")
    public CommonResponse<DemandDepositAccountBalanceResponse> getAccountBalance(
        @RequestParam("userKey") String userKey,
        @RequestParam("accountNo") String accountNo
    ) {
        if(accountNo.length() > 16) {
            throw new IllegalArgumentException("계좌 번호는 16글자입니다.");
        }
        return CommonResponse.ok("완료", demandDepositService.getDemandDepositAccountBalance(userKey,
                                                                                           accountNo));
    }

    @PostMapping("/accounts/deposit")
    @Operation(summary = "입출금계좌에 예금")
    public CommonResponse<DemandDepositDepositResponse> depositAccount(
        @RequestParam("userKey") String userKey,
        @Valid @RequestBody DemandDepositDepositAccountRequest accountRequest
    ) {
        return CommonResponse.ok("완료", demandDepositService.depositDemandDepositAccount(userKey,
                                                                                        accountRequest));
    }

    @PostMapping("/accounts/transfer")
    @Operation(summary = "입출금계좌에서 이체")
    public CommonResponse<List<DemandDepositTransferResponse>> transferAccount(
        @RequestParam("userKey") String userKey,
        @Valid @RequestBody DemandDepositTransferAccountRequest transferAccountRequest
    ) {
        return CommonResponse.ok("완료", demandDepositService.transferDemandDepositAccount(userKey,
                                                                                         transferAccountRequest));
    }

    @PostMapping("/transactions/histories")
    @Operation(summary = "입출금계좌 거래내역 조회")
    public CommonResponse<TransactionListResponse> getTransactionHistories(
        @RequestParam("userKey") String userKey,
        @Valid @RequestBody DemandDepositGetTransactionsRequest getTransactionsRequest
    ) {
        return CommonResponse.ok("완료", demandDepositService.getTransactionHistories(userKey,
                                                                                    getTransactionsRequest));
    }

    @PostMapping("/transactions/histories/detail")
    @Operation(summary = "입출금계좌 단일 거래내역 조회")
    public CommonResponse<TransactionResponse> getTransactionHistory(
        @RequestParam("userKey") String userKey,
        @Valid @RequestBody DemandDepositGetTransactionRequest getTransactionRequest
    ) {
        return CommonResponse.ok("완료", demandDepositService.getTransactionHistory(userKey,
                                                                                  getTransactionRequest));
    }
}
