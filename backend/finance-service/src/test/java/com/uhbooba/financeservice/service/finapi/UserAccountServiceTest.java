package com.uhbooba.financeservice.service.finapi;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.uhbooba.financeservice.dto.finapi.HandlerParamWithoutHeader;
import com.uhbooba.financeservice.util.finapi.FinOpenApiHandler;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

class UserAccountServiceTest {

    @Mock
    private FinOpenApiHandler finApiHandler;

    @InjectMocks
    private UserAccountService userAccountService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("금융 API 테스트 by WebClient (초기화 제외 후 성능 측정)")
    void getOrCreateUserAccountWithAsyncTiming() throws Exception {
        Long userId = 1L;
        JsonNode mockResponse = mock(JsonNode.class);

        when(finApiHandler.apiRequest((HandlerParamWithoutHeader) any())).thenReturn(
            Mono.just(mockResponse));

        // WebClient 초기화 작업 수행 (첫 번째 호출)
        userAccountService.getOrCreateUserAccount(userId);

        // 성능 측정 시작
        long totalStartTime = System.currentTimeMillis();

        // WebClient 비동기 방식의 API 호출 (동시 10개의 병렬 호출을 수행)
        Flux.range(1, 1000)
            .flatMap(i -> {
                try {
                    return userAccountService.getOrCreateUserAccount(userId);
                } catch(JsonProcessingException e) {
                    throw new RuntimeException(e);
                }
            })
            .collectList(); // 비동기 호출을 모두 수집

        long totalEndTime = System.currentTimeMillis();
        long totalDuration = totalEndTime - totalStartTime;

        System.out.println("총 WebClient API 호출 시간 (초기화 제외): " + totalDuration + " ms");

        verify(finApiHandler, times(101)).apiRequest(
            (HandlerParamWithoutHeader) any());  // 1번 초기화 호출 포함
    }


    // RestTemplate 병렬 처리 방식
    @Test
    @DisplayName("금융 API 테스트 by RestTemplate (초기화 제외 후 성능 측정)")
    void getOrCreateUserAccountWithParallelExecution() throws Exception {
        Long userId = 1L;
        JsonNode mockResponse = mock(JsonNode.class);

        when(finApiHandler.apiRequestRT(any())).thenReturn(mockResponse);

        ExecutorService executorService = Executors.newFixedThreadPool(1); // 병렬로 10개의 스레드 풀 생성

        // RestTemplate 초기화 작업 수행 (첫 번째 호출)
        userAccountService.getOrCreateUserAccountWithRT(userId);

        // 성능 측정 시작
        long totalStartTime = System.currentTimeMillis();

        List<Future<Void>> futures = new ArrayList<>();

        for(int i = 1; i <= 1000; i++) {
            Future<Void> future = executorService.submit(() -> {
                JsonNode result = userAccountService.getOrCreateUserAccountWithRT(userId);
                assertNotNull(result);
                return null; // 결과를 반환하지 않고 완료 여부만 확인
            });
            futures.add(future);
        }

        // 모든 병렬 작업이 완료될 때까지 대기
        for(Future<Void> future : futures) {
            future.get(); // 작업이 완료될 때까지 기다림
        }

        long totalEndTime = System.currentTimeMillis();
        long totalDuration = totalEndTime - totalStartTime;

        System.out.println("총 RestTemplate API 호출 시간 (초기화 제외): " + totalDuration + " ms");

        verify(finApiHandler, times(101)).apiRequestRT(any());  // 1번 초기화 호출 포함

        executorService.shutdown();
        executorService.awaitTermination(1, TimeUnit.MINUTES); // 스레드 풀 종료
    }

    @Test
    @DisplayName("금융 API 테스트 by RestTemplate (동기 처리, 순차적 성능 측정)")
    void getOrCreateUserAccountWithSequentialExecution() throws Exception {
        Long userId = 1L;
        JsonNode mockResponse = mock(JsonNode.class);

        // Mock API response
        when(finApiHandler.apiRequestRT(any())).thenReturn(mockResponse);

        // RestTemplate 초기화 작업 수행 (첫 번째 호출)
        userAccountService.getOrCreateUserAccountWithRT(userId);

        // 성능 측정 시작
        long totalStartTime = System.currentTimeMillis();

        // 순차적으로 호출하는 for문
        for(int i = 1; i <= 1000; i++) {
            JsonNode result = userAccountService.getOrCreateUserAccountWithRT(userId);
            assertNotNull(result);
        }

        long totalEndTime = System.currentTimeMillis();
        long totalDuration = totalEndTime - totalStartTime;

        System.out.println("총 RestTemplate API 호출 시간 (순차 처리): " + totalDuration + " ms");

        verify(finApiHandler, times(101)).apiRequestRT(any());  // 1번 초기화 호출 포함
    }

}
