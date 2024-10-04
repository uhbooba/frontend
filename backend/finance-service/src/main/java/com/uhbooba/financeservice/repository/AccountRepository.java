package com.uhbooba.financeservice.repository;

import com.uhbooba.financeservice.entity.Account;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Integer>,
    AccountCustomRepository {

    Optional<Account> findByAccountNo(String accountNo);
}
