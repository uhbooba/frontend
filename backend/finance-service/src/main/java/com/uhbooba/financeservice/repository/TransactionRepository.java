package com.uhbooba.financeservice.repository;

import com.uhbooba.financeservice.entity.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {


    Page<Transaction> findByAccountId(
        Integer accountId,
        Pageable pageable
    );
}
