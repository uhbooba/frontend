package com.uhbooba.financeservice.dto.kafka;

import lombok.Builder;

@Builder
public record NotificationMessageResponse(

    String user_id,
    String title,
    String body

) {

}
