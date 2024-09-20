package com.uhbooba.userservice.service;

import com.uhbooba.userservice.dto.request.SignupRequest;
import com.uhbooba.userservice.entity.User;
import com.uhbooba.userservice.exception.DuplicateUserException;
import com.uhbooba.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public void signup(SignupRequest request) {
        duplicateUsername(request.username());
        duplicatePhoneNumber(request.phoneNumber());

        User user = User.builder()
            .name(request.name())
            .username(request.username())
            .password(bCryptPasswordEncoder.encode(request.password()))
            .phoneNumber(request.phoneNumber())
            .build();

        userRepository.save(user);
    }

    public void duplicatePhoneNumber(String phoneNumber) {
        userRepository.findByPhoneNumber(phoneNumber)
            .ifPresent(user -> {
                throw new DuplicateUserException("이미 가입한 회원입니다.");
            });
    }

    public void duplicateUsername(String username) {
        userRepository.findByUsername(username)
            .ifPresent(user -> {
                throw new DuplicateUserException("이미 존재하는 아이디입니다.");
            });
    }

}
