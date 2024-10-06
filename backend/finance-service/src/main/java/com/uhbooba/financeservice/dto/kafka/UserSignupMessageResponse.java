package com.uhbooba.financeservice.dto.kafka;

import lombok.Builder;

@Builder
public record UserSignupMessageResponse(

    Integer id,
    String name

) {

}
