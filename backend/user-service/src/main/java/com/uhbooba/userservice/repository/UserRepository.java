package com.uhbooba.userservice.repository;

import com.uhbooba.userservice.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);

    Optional<User> findByPhone(String phone);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.password = :password WHERE u.phone = :phone")
    void updatePasswordByPhone(@Param("phone") String phone, @Param("password") String password);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.isFirstLogin = :isFirstLogin WHERE u.phone = :phone")
    void updateFirstLoginByPhone(@Param("phone") String phone,
        @Param("isFirstLogin") Boolean isFirstLogin);

}
