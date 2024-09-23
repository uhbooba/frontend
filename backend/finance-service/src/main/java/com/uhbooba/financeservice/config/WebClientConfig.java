package com.uhbooba.financeservice.config;

import io.netty.channel.nio.NioEventLoopGroup;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient webClient() {
        // NioEventLoopGroup을 사용해 스레드 풀 설정
        NioEventLoopGroup eventLoopGroup = new NioEventLoopGroup(10); // 10개의 스레드 지정

        // HttpClient 설정
        HttpClient httpClient = HttpClient.create()
                                          .runOn(eventLoopGroup); // 지정한 스레드 풀 사용

        return WebClient.builder()
                        .clientConnector(new ReactorClientHttpConnector(httpClient))
                        .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .build();
    }
}
