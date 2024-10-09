package com.uhbooba.userservice.dto.response;

import com.uhbooba.userservice.entity.User;
import lombok.Builder;

@Builder
public record UserSignupMessageResponse(

    Integer id,
    String name

) {

    public static UserSignupMessageResponse of(User data) {
        return UserSignupMessageResponse.builder()
            .id(data.getId())
            .name(data.getName())
            .build();
    }
}
