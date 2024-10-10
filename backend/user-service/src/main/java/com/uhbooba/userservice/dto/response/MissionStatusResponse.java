package com.uhbooba.userservice.dto.response;

import lombok.Builder;

@Builder
public record MissionStatusResponse(

    Integer missionNumber,
    Boolean isCleared

) {

    public static MissionStatusResponse of(Integer missionNumber, Boolean isCleared) {
        return MissionStatusResponse.builder()
            .missionNumber(missionNumber)
            .isCleared(isCleared)
            .build();
    }

}
