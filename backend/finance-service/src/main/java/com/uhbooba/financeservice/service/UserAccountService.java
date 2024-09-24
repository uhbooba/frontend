package com.uhbooba.financeservice.service;

import com.uhbooba.financeservice.service.finapi.FinApiUserAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserAccountService {

    private final FinApiUserAccountService finApiUserAccountService;

    public void createUserAccount() {
        
    }

}
