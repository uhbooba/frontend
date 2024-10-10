package com.uhbooba.financeservice.util;

import com.uhbooba.financeservice.client.UserServiceClient;
import com.uhbooba.financeservice.dto.openfeign.PasswordCheckRequest;
import com.uhbooba.financeservice.exception.UnAuthorizationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PasswordService {

    private final UserServiceClient userServiceClient;

    public void validatePassword(
        Integer userId,
        String password
    ) {
        PasswordCheckRequest request = PasswordCheckRequest.builder()
                                                           .id(userId)
                                                           .password(password)
                                                           .build();
        Boolean isValid = userServiceClient.isValidPassword(request);
        if(!isValid) {
            throw new UnAuthorizationException();
        }
    }
}
