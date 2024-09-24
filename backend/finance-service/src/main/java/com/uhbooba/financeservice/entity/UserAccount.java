package com.uhbooba.financeservice.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.OffsetDateTime;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "user_account")
public class UserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private Integer userServiceId; // user service 에서의 Id

    @Column(nullable = false, unique = true)
    private String userId; // open API 에서 사용한 email 형식의 userId <- 필요 없을 수도 있음

    @Column(nullable = false, unique = true)
    private String userKey;

    @Column
    private OffsetDateTime created;

    @Column
    private OffsetDateTime modified;

    // 계좌 정보와 연관 관계 설정
    @OneToMany(mappedBy = "userAccount", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Account> accounts;  // 사용자 계좌 목록

    @Builder
    public UserAccount(
        Integer userServiceId,
        String userId,
        String userKey,
        OffsetDateTime created,
        OffsetDateTime modified
    ) {
        this.userServiceId = userServiceId;
        this.userId = userId;
        this.userKey = userKey;
        this.created = created;
        this.modified = modified;
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
