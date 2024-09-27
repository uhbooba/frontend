package com.uhbooba.userservice.controller;

import com.uhbooba.userservice.dto.CommonResponse;
import com.uhbooba.userservice.dto.request.SignupRequest;
import com.uhbooba.userservice.exception.SignupFormatException;
import com.uhbooba.userservice.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
@RequestMapping("/users")
@Tag(name = "회원 관리", description = "회원 API 입니다.")
public class UserController {

    private final UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "회원 가입")
    public CommonResponse<?> sighup(@Valid @RequestBody SignupRequest request,
        BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new SignupFormatException();
        }
        userService.signup(request);
        return CommonResponse.created("회원가입 성공");
    }

    @GetMapping("/check-username/{username}")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "아이디 중복 확인")
    public CommonResponse<?> checkUsername(@PathVariable("username") String username) {
        userService.duplicateUsername(username);
        return CommonResponse.ok("아이디 사용 가능");
    }

    @GetMapping("/check-phone/{phone}")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "전화번호 중복 확인")
    public CommonResponse<?> checkPhone(@PathVariable("phone") String phone) {
        userService.duplicatePhone(phone);
        return CommonResponse.ok("전화번호 사용 가능");
    }

}
