package com.uhbooba.financeservice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "account", indexes = {@Index(name = "idx_account_no", columnList = "accountNo")})
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_account_id", nullable = false)
    @Setter
    private UserAccount userAccount; // 사용자 계정

    @Column(nullable = false)
    private String accountNo; // 계좌 번호

    @Column
    private String accountName; // 계좌 이름

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @Setter
    private AccountType accountTypeCode; // 계좌 타입

    @Column
    @Setter
    private String accountTypeName;

    @Builder
    public Account(
        UserAccount userAccount,
        String accountNo,
        String accountName,
        AccountType accountTypeCode,
        String accountTypeName
    ) {
        this.userAccount = userAccount;
        this.accountNo = accountNo;
        this.accountName = accountName;
        this.accountTypeCode = accountTypeCode;
        this.accountTypeName = accountTypeName;
    }
}
