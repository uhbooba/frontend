package com.uhbooba.userservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 15)
    private String name;

    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false, length = 15)
    private String phoneNumber;

    @Column(nullable = false)
    private Boolean isTwoFactorAuthEnabled;

    @Column(nullable = false)
    private Boolean isFirstLogin;

    @Builder
    public User(String name, String username, String password, String phoneNumber) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.isTwoFactorAuthEnabled = false;
        this.isFirstLogin = true;
    }

}
