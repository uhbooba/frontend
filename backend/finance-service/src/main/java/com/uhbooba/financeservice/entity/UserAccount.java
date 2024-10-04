package com.uhbooba.financeservice.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "user_account")
public class UserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private Integer userId; // user service 에서의 Id

    @Column(nullable = false, unique = true)
    private String userKey;

    @Column
    @Setter
    private String username;

    // 계좌 정보와 연관 관계 설정
    @OneToMany(mappedBy = "userAccount", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Account> accounts;  // 사용자 계좌 목록

    @Builder
    public UserAccount(
        Integer userId,
        String userKey,
        String username
    ) {
        this.userId = userId;
        this.userKey = userKey;
        this.username = username;
    }

    /**
     * 사용자 계정에 계좌 추가
     *
     * @param account
     */
    public void addAccount(Account account) {
        this.accounts.add(account);
        account.setUserAccount(this);
    }
}
