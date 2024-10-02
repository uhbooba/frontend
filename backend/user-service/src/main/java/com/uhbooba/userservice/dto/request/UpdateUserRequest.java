package com.uhbooba.userservice.dto.request;

import jakarta.validation.constraints.NotEmpty;

public record UpdateUserRequest(

    @NotEmpty
    String phone,

    String password,

    Boolean isLoginFirst

) {

}
