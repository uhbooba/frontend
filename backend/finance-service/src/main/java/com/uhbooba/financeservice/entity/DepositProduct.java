package com.uhbooba.financeservice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "deposit_product")
public class DepositProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String accountTypeUniqueNo;

    @Column
    private String bankCode;

    @Column
    private String bankName;

    @Column
    private String accountTypeCode;

    @Column
    private String accountTypeName;

    @Column
    private String accountName;

    @Column
    private String accountDescription;

    @Column
    private String subscriptionPeriod;

    @Column
    private Long minSubscriptionBalance;

    @Column
    private Long maxSubscriptionBalance;

    @Column
    private Double interestRate;

    @Column
    private String rateDescription;

    @Builder
    public DepositProduct(
        String accountTypeUniqueNo,
        String bankCode,
        String bankName,
        String accountTypeCode,
        String accountTypeName,
        String accountName,
        String accountDescription,
        String subscriptionPeriod,
        Long minSubscriptionBalance,
        Long maxSubscriptionBalance,
        Double interestRate,
        String rateDescription
    ) {
        this.accountTypeUniqueNo = accountTypeUniqueNo;
        this.bankCode = bankCode;
        this.bankName = bankName;
        this.accountTypeCode = accountTypeCode;
        this.accountTypeName = accountTypeName;
        this.accountName = accountName;
        this.accountDescription = accountDescription;
        this.subscriptionPeriod = subscriptionPeriod;
        this.minSubscriptionBalance = minSubscriptionBalance;
        this.maxSubscriptionBalance = maxSubscriptionBalance;
        this.interestRate = interestRate;
        this.rateDescription = rateDescription;
    }
}
