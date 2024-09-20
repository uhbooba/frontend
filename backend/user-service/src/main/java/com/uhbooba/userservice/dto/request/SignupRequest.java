package com.uhbooba.userservice.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record SignupRequest(

    @NotBlank(message = "이름을 입력해주세요.")
    @Size(max = 15, message = "이름은 최대 15자까지 가능합니다.")
    String name,

    @NotBlank(message = "아이디를 입력해주세요.")
    @Size(max = 20, message = "아이디는 최대 20자입니다.")
    @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "아이디는 영어와 숫자만 가능합니다.")
    String username,

    @NotBlank(message = "비밀번호를 입력해주세요.")
    @Size(min = 6, max = 6, message = "비밀번호는 6자리여야 합니다.")
    String password,

    @NotBlank(message = "전화번호를 입력해주세요.")
    @Size(max = 15, message = "전화번호는 최대 15자까지 가능합니다.")
    @Pattern(regexp = "^\\d{10,15}$", message = "전화번호는 숫자로 10자리에서 15자리까지 입력 가능합니다.")
    String phoneNumber

) {

}
