package com.uhbooba.apigateway.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(servers = {@Server(url = "/", description = "Default Server URL")})
@Configuration
public class SwaggerConfig {

    @Bean
    public GroupedOpenApi bookServiceApi() {
        return GroupedOpenApi.builder()
                             .group("user-service")
                             .pathsToMatch("/users/**")
                             .build();
    }

    @Bean
    public GroupedOpenApi curationServiceApi() {
        return GroupedOpenApi.builder()
                             .group("finance-service")
                             .pathsToMatch("/finances/**")
                             .build();
    }

    @Bean
    public GroupedOpenApi libraryServiceApi() {
        return GroupedOpenApi.builder()
                             .group("external-service")
                             .pathsToMatch("/externals/**")
                             .build();
    }
}