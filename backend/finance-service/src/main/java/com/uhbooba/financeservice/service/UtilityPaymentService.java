package com.uhbooba.financeservice.service;

import com.uhbooba.financeservice.dto.UtilityPaymentRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositTransferAccountRequest;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositAccountResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UtilityPaymentService {

    @Value("${variables.utility-payment-account-no}")
    private String utilityPaymentAccountNo;

    private final DemandDepositService demandDepositService;

    public void payUtilities(
        Integer userId,
        UtilityPaymentRequest request
    ) {
        DemandDepositAccountResponse demandDepositAccount = demandDepositService.getDemandDepositAccount(
            userId);

        DemandDepositTransferAccountRequest transferRequest = DemandDepositTransferAccountRequest.builder()
                                                                                                 .depositAccountNo(
                                                                                                     utilityPaymentAccountNo)
                                                                                                 .depositTransactionSummary(
                                                                                                     "10월 공과금 납부")
                                                                                                 .transactionBalance(
                                                                                                     request.amount())
                                                                                                 .withdrawalAccountNo(
                                                                                                     demandDepositAccount.accountNo())
                                                                                                 .withdrawalTransactionSummary(
                                                                                                     "10월 공과금 납부")

                                                                                                 .build();
        demandDepositService.transferDemandDepositAccount(userId, transferRequest);
    }
}
