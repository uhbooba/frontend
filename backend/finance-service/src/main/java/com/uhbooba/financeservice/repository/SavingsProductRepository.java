package com.uhbooba.financeservice.repository;

import com.uhbooba.financeservice.entity.SavingsProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavingsProductRepository extends JpaRepository<SavingsProduct, Integer> {}
