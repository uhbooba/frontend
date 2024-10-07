package com.uhbooba.financeservice.client;

import com.uhbooba.financeservice.dto.openfeign.PasswordCheckRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "user-service")
public interface UserServiceClient {

    @PostMapping("/users/password")
    Boolean isValidPassword(
        PasswordCheckRequest request
    );
}
