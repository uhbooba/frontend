package com.uhbooba.financeservice.repository;

import com.uhbooba.financeservice.entity.ExchangeAccount;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExchangeAccountRepository extends JpaRepository<ExchangeAccount, Integer> {

    Optional<ExchangeAccount> findByAccountId(Integer accountId);

    ExchangeAccount findByAccountIdAndCurrency(
        Integer accountId,
        String currency
    );
}
