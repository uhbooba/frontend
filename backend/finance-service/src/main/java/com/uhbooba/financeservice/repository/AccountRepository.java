package com.uhbooba.financeservice.repository;

import com.uhbooba.financeservice.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Integer>,
    AccountCustomRepository {

    Account findByAccountNo(String accountNo);
}
