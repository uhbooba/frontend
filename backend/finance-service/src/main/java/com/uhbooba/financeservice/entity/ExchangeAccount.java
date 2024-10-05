package com.uhbooba.financeservice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "exchange_account")
public class ExchangeAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String currency;

    @Column
    private String exchangeRate;

    @Column
    @Setter
    private Long balance;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    @Setter
    private Account account; // 사용자 계정

    @Builder
    public ExchangeAccount(
        String currency,
        String exchangeRate,
        Long balance,
        Account account
    ) {
        this.currency = currency;
        this.exchangeRate = exchangeRate;
        this.balance = balance;
        this.account = account;
    }
}
