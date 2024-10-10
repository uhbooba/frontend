package com.uhbooba.userservice.dto.response;

import lombok.Builder;

@Builder
public record FcmTokenMessageResponse(

    Integer user_id,
    String token

) {

    public static FcmTokenMessageResponse of(Integer user_id, String token) {
        return FcmTokenMessageResponse.builder()
            .user_id(user_id)
            .token(token)
            .build();
    }
}
