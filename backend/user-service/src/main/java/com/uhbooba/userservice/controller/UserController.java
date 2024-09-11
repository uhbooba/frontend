package com.uhbooba.userservice.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    @GetMapping("/test")
    @Operation(summary = "Test Endpoint", description = "Returns a test response")
    public Integer testEndpoint() {
        return 100;
    }
}
