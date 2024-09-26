package com.uhbooba.financeservice.dto.finapi.response.demand_deposit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;

@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public record DemandDepositAccountResponse(
    String bankCode,
    String bankName,
    String userName,
    String accountNo,
    String accountName,
    String accountTypeCode,
    String accountTypeName,
    //    String accountCreatedDate,
    //    String accountExpiryDate,
    //    String dailyTransferLimit,
    //    String oneTimeTransferLimit,
    String accountBalance,
    //    String lastTransactionDate,
    String currency
) {}
