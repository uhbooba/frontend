package com.uhbooba.userservice.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record LoginRequest(

    @NotBlank(message = "아이디를 입력해주세요.")
    @Size(max = 20, message = "아이디는 최대 20자입니다.")
    @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "아이디는 영어와 숫자만 가능합니다.")
    String username,

    @NotBlank(message = "비밀번호를 입력해주세요.")
    @Size(min = 6, max = 6, message = "비밀번호는 6자리여야 합니다.")
    String password,

    @NotBlank(message = "fcm 토큰을 입력해주세요")
    String fcmToken

) {

}
