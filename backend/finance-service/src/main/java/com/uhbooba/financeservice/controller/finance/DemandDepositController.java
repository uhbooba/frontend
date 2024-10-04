package com.uhbooba.financeservice.controller.finance;

import static com.uhbooba.financeservice.util.ApiDescriptions.Common.INPUT;
import static com.uhbooba.financeservice.util.ApiDescriptions.Common.OUTPUT;
import static com.uhbooba.financeservice.util.ApiDescriptions.DemandDepositController.DEMAND_DEPOSIT_ACCOUNT_RESPONSE;

import com.uhbooba.financeservice.dto.CommonResponse;
import com.uhbooba.financeservice.dto.UserHeaderInfo;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositCreateRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositDepositAccountRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositGetTransactionRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositGetTransactionsRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositTransferAccountRequest;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositAccountBalanceResponse;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositAccountResponse;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositDepositResponse;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositResponse;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositTransferResponse;
import com.uhbooba.financeservice.dto.finapi.response.transaction.TransactionListResponse;
import com.uhbooba.financeservice.dto.finapi.response.transaction.TransactionResponse;
import com.uhbooba.financeservice.dto.response.AccountResponse;
import com.uhbooba.financeservice.service.DemandDepositService;
import com.uhbooba.financeservice.util.CommonUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
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
@Tag(name = "수시 입출금 API", description = "수시 입출금 관련 API")
@RequestMapping("/finances/demand-deposits")
public class DemandDepositController {

    private final DemandDepositService demandDepositService;

    @PostMapping("/products")
    @Operation(summary = "[사용 X] 입출금 상품 생성")
    public CommonResponse<DemandDepositResponse> createDemandDeposit(
        @Valid @RequestBody DemandDepositCreateRequest createRequest
    ) {
        return CommonResponse.ok("입출금 상품 생성 완료",
                                 demandDepositService.createDemandDeposit(createRequest));
    }

    @GetMapping("/products")
    @Operation(summary = "[사용 X] 입출금 상품 전체 조회")
    public CommonResponse<List<DemandDepositResponse>> getDemandDeposits(
    ) {
        return CommonResponse.ok("완료", demandDepositService.getAllDemandDeposits());
    }

    @PostMapping("/accounts")
    @Operation(summary = "[사용 X] 입출금 계좌 생성", description = "입출금 계좌를 생성합니다. \n 프론트에서 직접적인 호출 없이 User Service 와의 통신으로 자동 진행됩니다.")
    public CommonResponse<DemandDepositAccountResponse> createDemandDepositAccount(
        @RequestHeader HttpHeaders headers
    ) {
        UserHeaderInfo userHeaderInfo = CommonUtil.getUserHeaderInfo(headers);

        return CommonResponse.ok("완료",
                                 demandDepositService.createDemandDepositAccount(userHeaderInfo));
    }

    @GetMapping("/accounts/detail")
    @Operation(summary = "입출금계좌 조회", description = "입출금 계좌를 상세 조회 합니다." + INPUT + OUTPUT
        + DEMAND_DEPOSIT_ACCOUNT_RESPONSE)
    public CommonResponse<AccountResponse> getAccountDetail(
        @RequestHeader HttpHeaders headers
    ) {
        UserHeaderInfo userHeaderInfo = CommonUtil.getUserHeaderInfo(headers);

        return CommonResponse.ok("완료",
                                 demandDepositService.getDemandDepositAccount(userHeaderInfo));
    }

    @GetMapping("/accounts/holder")
    @Operation(summary = "입출금계좌 소유자 이름 조회", description = """
            해당 계좌의 소유자 정보를 확인합니다. \n
        """)
    public CommonResponse<AccountResponse> getAccountHolderName(
        @RequestHeader HttpHeaders headers,
        @RequestParam("accountNo") String accountNo
    ) {
        if(accountNo.length() > 16) {
            throw new IllegalArgumentException("계좌 번호는 16글자입니다.");
        }
        UserHeaderInfo userHeaderInfo = CommonUtil.getUserHeaderInfo(headers);

        return CommonResponse.ok("완료", demandDepositService.getDemandDepositAccountHolderName(
            userHeaderInfo, accountNo));
    }

    @GetMapping("/accounts/balances")
    @Operation(summary = "[사용 X] 입출금계좌 잔액 조회")
    public CommonResponse<DemandDepositAccountBalanceResponse> getAccountBalance(
        @RequestHeader HttpHeaders headers,
        @RequestParam("accountNo") String accountNo
    ) {
        if(accountNo.length() > 16) {
            throw new IllegalArgumentException("계좌 번호는 16글자입니다.");
        }
        UserHeaderInfo userHeaderInfo = CommonUtil.getUserHeaderInfo(headers);

        return CommonResponse.ok("완료",
                                 demandDepositService.getDemandDepositAccountBalance(userHeaderInfo,
                                                                                     accountNo));
    }

    @PostMapping("/accounts/deposit")
    @Operation(summary = "입출금계좌에 입금")
    public CommonResponse<DemandDepositDepositResponse> depositAccount(
        @RequestHeader HttpHeaders headers,
        @Valid @RequestBody DemandDepositDepositAccountRequest accountRequest
    ) {
        UserHeaderInfo userHeaderInfo = CommonUtil.getUserHeaderInfo(headers);

        return CommonResponse.ok("완료",
                                 demandDepositService.depositDemandDepositAccount(userHeaderInfo,
                                                                                  accountRequest));
    }

    @PostMapping("/accounts/transfer")
    @Operation(summary = "입출금계좌에서 이체")
    public CommonResponse<List<DemandDepositTransferResponse>> transferAccount(
        @RequestHeader HttpHeaders headers,
        @Valid @RequestBody DemandDepositTransferAccountRequest transferAccountRequest
    ) {
        UserHeaderInfo userHeaderInfo = CommonUtil.getUserHeaderInfo(headers);

        return CommonResponse.ok("완료",
                                 demandDepositService.transferDemandDepositAccount(userHeaderInfo,
                                                                                   transferAccountRequest));
    }

    @PostMapping("/transactions/histories")
    @Operation(summary = "[사용 X] 입출금계좌 거래내역 조회")
    public CommonResponse<TransactionListResponse> getTransactionHistories(
        @RequestHeader HttpHeaders headers,
        @Valid @RequestBody DemandDepositGetTransactionsRequest getTransactionsRequest
    ) {
        UserHeaderInfo userHeaderInfo = CommonUtil.getUserHeaderInfo(headers);

        return CommonResponse.ok("완료", demandDepositService.getTransactionHistories(userHeaderInfo,
                                                                                    getTransactionsRequest));
    }

    @PostMapping("/transactions/histories/detail")
    @Operation(summary = "[사용 X] 입출금계좌 단일 거래내역 조회")
    public CommonResponse<TransactionResponse> getTransactionHistory(
        @RequestHeader HttpHeaders headers,
        @Valid @RequestBody DemandDepositGetTransactionRequest getTransactionRequest
    ) {
        UserHeaderInfo userHeaderInfo = CommonUtil.getUserHeaderInfo(headers);

        return CommonResponse.ok("완료", demandDepositService.getTransactionHistory(userHeaderInfo,
                                                                                  getTransactionRequest));
    }
}
