package com.uhbooba.financeservice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "transaction")
public class Transaction extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = true)
    @Setter
    private Account account; // 사용자 계정

    @Column
    @Setter
    private String transactionUniqueNo;

    @Column
    @Enumerated(EnumType.STRING)
    @Setter
    private TransactionStatus status;

    @Column
    @Enumerated(EnumType.STRING)
    private TransactionType type;

    @Column
    private Long transactionBalance;

    @Column
    @Setter
    private String transactionAfterBalance;

    @Column
    @Setter
    private String transactionSummary;

    @Builder
    public Transaction(
        TransactionStatus status,
        String transactionAfterBalance,
        Long transactionBalance,
        String transactionSummary,
        TransactionType type,
        String transactionTypeName,
        String transactionUniqueNo,
        Account account
    ) {
        this.status = status;
        this.transactionAfterBalance = transactionAfterBalance;
        this.transactionBalance = transactionBalance;
        this.transactionSummary = transactionSummary;
        this.type = type;
        this.transactionUniqueNo = transactionUniqueNo;
        this.account = account;
    }
}
