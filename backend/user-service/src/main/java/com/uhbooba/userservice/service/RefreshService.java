package com.uhbooba.userservice.service;

import static com.uhbooba.userservice.constant.JWT_SET.*;

import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RefreshService {

    private final RedisTemplate<String, Object> redisTemplate;

    public void saveRefreshToken(String token, String userId) {
        redisTemplate.opsForValue()
            .set(token, userId, REFRESH_TOKEN_EXPIRATION, TimeUnit.MILLISECONDS);
    }

    public String getUsernameFromToken(String token) {
        return (String) redisTemplate.opsForValue().get(token);
    }

    public void deleteRefreshToken(String token) {
        redisTemplate.delete(token);
    }

    public boolean isTokenExists(String token) {
        return redisTemplate.hasKey(token);
    }
}
