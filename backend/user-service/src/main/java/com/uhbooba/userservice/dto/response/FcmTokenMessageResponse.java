package com.uhbooba.userservice.dto.response;

import lombok.Builder;

@Builder
public record FcmTokenMessageResponse(

    Integer id,
    String fcmToken

) {

    public static FcmTokenMessageResponse of(Integer id, String fcmToken) {
        return FcmTokenMessageResponse.builder()
            .id(id)
            .fcmToken(fcmToken)
            .build();
    }
}
