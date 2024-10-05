package com.uhbooba.userservice.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(servers = @Server(url = "/", description = "Default Server URL"))
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI().addSecurityItem(new SecurityRequirement().addList("access"))
                            .components(
                                new io.swagger.v3.oas.models.Components().addSecuritySchemes(
                                    "access",
                                    new SecurityScheme().name("access")  // 헤더 이름을 'access'로 지정
                                                        .type(
                                                            SecurityScheme.Type.APIKEY)  // API key 타입
                                                        .in(SecurityScheme.In.HEADER)  // 헤더에서 사용
                                                        .scheme("access")))  // 스키마 이름
                            .info(new Info().title("사용자 API")
                                            .version("1.0")
                                            .description("사용자 API 문서"));
    }
}
