package com.uhbooba.userservice.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uhbooba.userservice.dto.CommonResponse;
import com.uhbooba.userservice.exception.InvalidTokenException;
import com.uhbooba.userservice.exception.TokenExpiredException;
import com.uhbooba.userservice.exception.TokenNullException;
import com.uhbooba.userservice.service.RefreshService;
import com.uhbooba.userservice.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@RequiredArgsConstructor
public class CustomLogoutFilter extends GenericFilterBean {

    private final JWTUtil jwtUtil;
    private final RefreshService refreshService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
        FilterChain filterChain) throws IOException, ServletException {
        doFilter((HttpServletRequest) servletRequest, (HttpServletResponse) servletResponse,
            filterChain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain)
        throws IOException, ServletException {

        if (!isLogoutRequest(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String refreshToken = extractRefreshToken(request)
                .orElseThrow(() -> new TokenNullException("Refresh token이 없습니다."));

            validateRefreshToken(refreshToken);

            refreshService.deleteRefreshToken(refreshToken);
            clearRefreshTokenCookie(response);

            sendSuccessResponse(response, "Logout 성공");
        } catch (Exception e) {
            handleException(response, e);
        }
    }

    private boolean isLogoutRequest(HttpServletRequest request) {
        return "/logout".equals(request.getRequestURI()) && "POST".equals(request.getMethod());
    }

    private Optional<String> extractRefreshToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getCookies())
            .flatMap(cookies -> Arrays.stream(cookies)
                .filter(cookie -> "refresh".equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst());
    }

    private void validateRefreshToken(String refreshToken) {
        try {
            jwtUtil.isExpired(refreshToken);
        } catch (ExpiredJwtException e) {
            throw new TokenExpiredException("refresh token이 만료되었습니다.");
        }

        if (!"refresh".equals(jwtUtil.getCategory(refreshToken))) {
            throw new InvalidTokenException("refresh token이 아닙니다.");
        }

        if (!refreshService.isTokenExists(refreshToken)) {
            throw new InvalidTokenException("refresh token이 DB에 존재하지 않습니다.");
        }

    }

    private void clearRefreshTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("refresh", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    private void sendSuccessResponse(HttpServletResponse response, String message)
        throws IOException {
        CommonResponse<?> responseBody = CommonResponse.ok(message);
        sendResponse(response, HttpServletResponse.SC_OK, responseBody);
    }

    private void handleException(HttpServletResponse response, Exception e) throws IOException {
        CommonResponse<String> errorResponse = CommonResponse.badRequest(e.getMessage());
        sendResponse(response, HttpServletResponse.SC_BAD_REQUEST, errorResponse);
    }

    private <T> void sendResponse(HttpServletResponse response, int status, CommonResponse<T> body)
        throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(objectMapper.writeValueAsString(body));
    }
}
