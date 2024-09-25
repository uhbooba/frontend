package com.uhbooba.financeservice.repository;

import com.uhbooba.financeservice.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAccountRepository extends JpaRepository<UserAccount, Integer> {

    UserAccount findByUserId(Integer userId);
}
