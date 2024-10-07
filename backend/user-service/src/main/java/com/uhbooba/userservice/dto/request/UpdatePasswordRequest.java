package com.uhbooba.userservice.dto.request;

import jakarta.validation.constraints.NotEmpty;

public record UpdatePasswordRequest(

    @NotEmpty
    String phone,

    String password

) {

}
