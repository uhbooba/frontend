package com.uhbooba.financeservice.dto.openfeign;

import lombok.Builder;

@Builder
public record PasswordCheckRequest(
    Integer id,
    String password
) {}
