package com.uhbooba.userservice.dto.request;

import lombok.Builder;

@Builder
public record PasswordCheckRequest(
    Integer id,
    String password
) {}
