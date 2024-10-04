package com.uhbooba.financeservice.service;

import com.uhbooba.financeservice.dto.UserHeaderInfo;
import com.uhbooba.financeservice.dto.UtilityPaymentRequest;
import com.uhbooba.financeservice.dto.finapi.request.demand_deposit.DemandDepositTransferAccountRequest;
import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositAccountResponse;
import com.uhbooba.financeservice.dto.response.AccountResponse;
import com.uhbooba.financeservice.entity.Account;
import com.uhbooba.financeservice.entity.AccountType;
import com.uhbooba.financeservice.entity.UserAccount;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UtilityPaymentService {

    @Value("${variables.utility-payment-account-no}")
    private String utilityPaymentAccountNo;

    private final DemandDepositService demandDepositService;
    private final UserAccountService userAccountService;
    private final AccountService accountService;

    public void payUtilities(
        UserHeaderInfo userHeaderInfo,
        UtilityPaymentRequest request
    ) {
        AccountResponse demandDepositAccount = demandDepositService.getDemandDepositAccount(
            userHeaderInfo);

        DemandDepositTransferAccountRequest transferRequest = DemandDepositTransferAccountRequest.builder()
                                                                                                 .depositAccountNo(
                                                                                                     utilityPaymentAccountNo)
                                                                                                 .depositTransactionSummary(
                                                                                                     "공과금 납부")
                                                                                                 .transactionBalance(
                                                                                                     request.amount())
                                                                                                 .withdrawalAccountNo(
                                                                                                     demandDepositAccount.accountNo())
                                                                                                 .withdrawalTransactionSummary(
                                                                                                     "공과금 납부")

                                                                                                 .build();
        demandDepositService.transferDemandDepositAccount(userHeaderInfo, transferRequest);
    }

    @Transactional
    public void initValueForUtilities() {
        // 1. user account 만들기
        int userId = 1_000_000;
        String name = "한국 전력 공사";
        UserHeaderInfo userHeaderInfo = UserHeaderInfo.builder()
                                                      .userId(userId)
                                                      .name(name)
                                                      .build();
        UserAccount userAccount = userAccountService.checkOrCreateUserAccount(userHeaderInfo);

        // 2. account(입출금) 만들기
        DemandDepositAccountResponse request = DemandDepositAccountResponse.builder()
                                                                           .accountName(name)
                                                                           .accountTypeCode(
                                                                               AccountType.DEMAND_DEPOSIT.getCode())
                                                                           .username(name)
                                                                           .accountNo(
                                                                               utilityPaymentAccountNo)
                                                                           .build();
        Account account = accountService.createAccount(request, userAccount);
    }
}
