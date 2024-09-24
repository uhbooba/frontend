package com.uhbooba.userservice.controller;

import static com.uhbooba.userservice.constant.JWT_SET.*;

import com.uhbooba.userservice.exception.InvalidTokenException;
import com.uhbooba.userservice.exception.TokenExpiredException;
import com.uhbooba.userservice.exception.TokenNullException;
import com.uhbooba.userservice.service.RefreshService;
import com.uhbooba.userservice.util.CookieUtil;
import com.uhbooba.userservice.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Optional;

@RestController
@RequestMapping("/reissue")
@RequiredArgsConstructor
public class ReissueController {

    private final JWTUtil jwtUtil;
    private final RefreshService refreshService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {

        String refreshToken = extractRefreshTokenFromCookies(request.getCookies())
            .orElseThrow(() -> new TokenNullException("refresh token이 존재하지 않습니다."));

        validateRefreshToken(refreshToken);

        String username = jwtUtil.getUsername(refreshToken);
        String name = jwtUtil.getName(refreshToken);

        String newAccess = jwtUtil.createJwt("access", username, name, ACCESS_TOKEN_EXPIRATION);
        String newRefresh = jwtUtil.createJwt("refresh", username, name, REFRESH_TOKEN_EXPIRATION);

        refreshService.deleteRefreshToken(refreshToken);
        refreshService.saveRefreshToken(newRefresh, username);

        setResponseHeaders(response, newAccess, newRefresh);

        return ResponseEntity.ok().build();
    }

    private Optional<String> extractRefreshTokenFromCookies(Cookie[] cookies) {
        return cookies == null ? Optional.empty() :
            Arrays.stream(cookies)
                .filter(cookie -> "refresh".equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst();
    }

    private void validateRefreshToken(String refreshToken) {
        try {
            jwtUtil.isExpired(refreshToken);
        } catch (ExpiredJwtException e) {
            throw new TokenExpiredException("refresh token가 만료되었습니다.");
        }

        if (!"refresh".equals(jwtUtil.getCategory(refreshToken))) {
            throw new InvalidTokenException("refresh token이 아닙니다.");
        }

        if (!refreshService.isTokenExists(refreshToken)) {
            throw new InvalidTokenException("refresh token이 DB에 존재하지 않습니다.");
        }
    }

    private void setResponseHeaders(HttpServletResponse response, String newAccess,
        String newRefresh) {
        response.setHeader("access", newAccess);
        Cookie refreshCookie = CookieUtil.createCookie("refresh", newRefresh);
        CookieUtil.addSameSiteCookieAttribute(response, refreshCookie);
    }
}
