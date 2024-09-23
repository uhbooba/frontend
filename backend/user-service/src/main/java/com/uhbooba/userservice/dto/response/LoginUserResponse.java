package com.uhbooba.userservice.dto.response;

import com.uhbooba.userservice.dto.CustomUserDetails;
import lombok.Builder;

@Builder
public record LoginUserResponse(

    String name,
    String username

) {

    public static LoginUserResponse of(CustomUserDetails data) {
        return LoginUserResponse.builder()
            .name(data.getName())
            .username(data.getUsername())
            .build();
    }
}
