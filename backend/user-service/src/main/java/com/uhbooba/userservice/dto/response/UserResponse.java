package com.uhbooba.userservice.dto.response;

import com.uhbooba.userservice.entity.User;
import lombok.Builder;

@Builder
public record UserResponse(

    Integer id,
    String name,
    String username,
    String phone

) {

    public static UserResponse of(User data) {
        return UserResponse.builder()
            .id(data.getId())
            .name(data.getName())
            .username(data.getUsername())
            .phone(data.getPhone())
            .build();
    }
}
