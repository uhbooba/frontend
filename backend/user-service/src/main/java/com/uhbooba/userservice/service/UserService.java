package com.uhbooba.userservice.service;

import com.uhbooba.userservice.dto.request.SignupRequest;
import com.uhbooba.userservice.dto.request.UpdateUserRequest;
import com.uhbooba.userservice.dto.response.UserSignupMessageResponse;
import com.uhbooba.userservice.entity.User;
import com.uhbooba.userservice.exception.DuplicateUserException;
import com.uhbooba.userservice.exception.NotFoundException;
import com.uhbooba.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserSignupMessageResponse signup(SignupRequest request) {
        duplicateUsername(request.username());
        duplicatePhone(request.phone());

        User user = User.builder()
            .name(request.name())
            .username(request.username())
            .password(bCryptPasswordEncoder.encode(request.password()))
            .phone(request.phone())
            .build();

        User savedUser = userRepository.save(user);
        return UserSignupMessageResponse.of(savedUser);
    }

    public void duplicatePhone(String phone) {
        userRepository.findByPhone(phone)
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

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new NotFoundException(username + "가 존재하지 않습니다."));
    }

    private void getUserByPhone(String phone) {
        User user = userRepository.findByPhone(phone)
            .orElseThrow(() -> new NotFoundException(phone + "가 존재하지 않습니다."));

    }

    public void updateUser(UpdateUserRequest request) {

        getUserByPhone(request.phone());

        if (!Boolean.TRUE.equals(request.isLoginFirst())) {
            userRepository.updatePasswordByPhone(request.phone(),
                bCryptPasswordEncoder.encode(request.password()));
        } else {
            userRepository.updateFirstLoginByPhone(request.phone(), false);
        }
    }

}
