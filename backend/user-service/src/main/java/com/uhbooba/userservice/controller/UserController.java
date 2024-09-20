package com.uhbooba.userservice.controller;

import com.uhbooba.userservice.dto.CommonResponse;
import com.uhbooba.userservice.dto.request.SignupRequest;
import com.uhbooba.userservice.exception.SignupFormatException;
import com.uhbooba.userservice.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-service/users")
public class UserController {

    private final Environment env;
    private final UserService userService;

    @GetMapping("/health-check")
    public String status() {
        return String.format("It's Working in User Service On PORT %s",
            env.getProperty("local.server.port"));
    }

    @PostMapping("/users")
    @ResponseStatus(HttpStatus.CREATED)
    public CommonResponse<?> join(@Valid @RequestBody SignupRequest request,
        BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new SignupFormatException();
        }
        userService.signup(request);
        return CommonResponse.created("회원가입 성공");
    }

    @GetMapping("/check-username/{username}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> checkUsername(@PathVariable("username") String username) {
        userService.duplicateUsername(username);
        return CommonResponse.ok("아이디 사용 가능");
    }

    @GetMapping("/check-phoneNumber/{phoneNumber}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> checkPhoneNumber(@PathVariable("phoneNumber") String phoneNumber) {
        userService.duplicatePhoneNumber(phoneNumber);
        return CommonResponse.ok("전화번호 사용 가능");
    }

}
