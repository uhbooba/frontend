package com.uhbooba.financeservice.repository;

import com.uhbooba.financeservice.entity.Account;
import com.uhbooba.financeservice.entity.AccountType;
import com.uhbooba.financeservice.entity.UserAccount;
import java.util.List;

public interface AccountCustomRepository {

    List<Account> findByAccountTypeCodeAndUserAccount(
        AccountType accountType,
        UserAccount userAccount
    );
}
