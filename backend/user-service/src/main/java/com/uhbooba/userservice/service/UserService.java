package com.uhbooba.userservice.service;

import com.uhbooba.userservice.dto.request.PasswordCheckRequest;
import com.uhbooba.userservice.dto.request.SignupRequest;
import com.uhbooba.userservice.dto.request.UpdatePasswordRequest;
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

    public void updatePasswordUser(UpdatePasswordRequest request) {

        getUserByPhone(request.phone());

        userRepository.updatePasswordByPhone(request.phone(),
                                             bCryptPasswordEncoder.encode(request.password()));
    }

    public Boolean isValidPassword(PasswordCheckRequest request) {
        // 1. user 찾기
        User user = userRepository.findById(request.id())
                                  .orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다."));
        // 2. 입력한 비밀번호와 저장된 해시된 비밀번호 비교
        return bCryptPasswordEncoder.matches(request.password(), user.getPassword());
    }
}
