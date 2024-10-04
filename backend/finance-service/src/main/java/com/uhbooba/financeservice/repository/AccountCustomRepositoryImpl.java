package com.uhbooba.financeservice.repository;

import static com.uhbooba.financeservice.entity.QAccount.account;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.uhbooba.financeservice.entity.Account;
import com.uhbooba.financeservice.entity.AccountType;
import com.uhbooba.financeservice.entity.UserAccount;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@AllArgsConstructor
public class AccountCustomRepositoryImpl implements AccountCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    @Transactional(readOnly = true)
    public List<Account> findByAccountTypeCodeAndUserAccount(
        AccountType accountType,
        UserAccount userAccount
    ) {
        BooleanBuilder predicate = new BooleanBuilder();
        // 계좌 종류
        predicate.and(account.accountTypeCode.eq(accountType));

        // 사용자
        predicate.and(account.userAccount.eq(userAccount));

        return queryFactory.selectFrom(account)
                           .where(predicate)
                           .fetch();
    }
}
