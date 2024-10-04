package com.uhbooba.financeservice.dto;

import lombok.Builder;

@Builder
public record UserHeaderInfo(
    Integer userId,
    String username,
    String name
) {}
