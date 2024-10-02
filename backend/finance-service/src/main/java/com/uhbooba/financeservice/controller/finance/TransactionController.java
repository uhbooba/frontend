package com.uhbooba.financeservice.controller.finance;

import com.uhbooba.financeservice.dto.CommonResponse;
import com.uhbooba.financeservice.dto.response.TransactionOutputResponse;
import com.uhbooba.financeservice.service.TransactionService;
import com.uhbooba.financeservice.util.CommonUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@Tag(name = "거래 내역 API", description = "거래 내역 관련 API")
@RequestMapping("/finances/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping
    @Operation(summary = "입출금계좌 거래내역 조회")
    public CommonResponse<Page<TransactionOutputResponse>> getTransactionHistories(
        @RequestHeader HttpHeaders headers,
        @RequestParam("accountNo") String accountNo,
        @RequestParam(value = "page", defaultValue = "0") int page,
        @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Integer userId = CommonUtil.getMemberId(headers);

        // Pageable 객체 생성
        Pageable pageable = PageRequest.of(page, size);

        // 거래 내역 조회
        Page<TransactionOutputResponse> transactions = transactionService.getAllTransactionsByAccountNo(
            accountNo, pageable);

        return CommonResponse.ok("완료", transactions);
    }

    @GetMapping("/{transaction_id}")
    @Operation(summary = "입출금계좌 단일 거래내역 조회")
    public CommonResponse<TransactionOutputResponse> getTransactionHistory(
        @RequestHeader HttpHeaders headers,
        @PathVariable("transaction_id") Integer transactionId
    ) {
        Integer userId = CommonUtil.getMemberId(headers);
        return CommonResponse.ok("완료", transactionService.getTransactionById(transactionId));
    }
}
