package com.uhbooba.userservice.dto.response;

import lombok.Builder;

@Builder
public record FcmTokenMessageResponse(

    Integer id,
    String token

) {

    public static FcmTokenMessageResponse of(Integer id, String token) {
        return FcmTokenMessageResponse.builder()
            .id(id)
            .token(token)
            .build();
    }
}
