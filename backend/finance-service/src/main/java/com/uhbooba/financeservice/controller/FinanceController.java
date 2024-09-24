package com.uhbooba.financeservice.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/finances")
public class FinanceController {

    @GetMapping("/test")
    @Operation(summary = "Test Endpoint", description = "Returns a test response")
    public Integer testEndpoint() {
        return 100;
    }
}
