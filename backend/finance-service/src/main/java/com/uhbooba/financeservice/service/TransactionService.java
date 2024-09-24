package com.uhbooba.financeservice.service;

import com.uhbooba.financeservice.entity.TransactionType;

public class TransactionService {

    public void createTransactionRequest(TransactionType transactionType) {
        // 외부 API 요청 시 transactionType의 requestCode 사용
        String requestCode = transactionType.getRequestCode();
        // 외부 API에 requestCode (M, D, A)를 전달

    }

    public void handleApiResponse(String apiResponse) {
        // 외부 API 응답을 숫자로 받음 (예: 1, 2)
        int responseCode = Integer.parseInt(apiResponse);

        // 응답을 TransactionType으로 변환
        TransactionType transactionType = TransactionType.fromResponseCode(responseCode);

        // 이후 비즈니스 로직 처리

    }

}
