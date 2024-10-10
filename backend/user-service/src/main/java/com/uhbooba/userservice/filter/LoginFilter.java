package com.uhbooba.userservice.filter;

import static com.uhbooba.userservice.constant.JWT_SET.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uhbooba.userservice.dto.CommonResponse;
import com.uhbooba.userservice.dto.CustomUserDetails;
import com.uhbooba.userservice.dto.request.LoginRequest;
import com.uhbooba.userservice.dto.response.FcmTokenMessageResponse;
import com.uhbooba.userservice.dto.response.LoginUserResponse;
import com.uhbooba.userservice.service.KafkaProducerService;
import com.uhbooba.userservice.service.RefreshService;
import com.uhbooba.userservice.util.CookieUtil;
import com.uhbooba.userservice.util.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StreamUtils;

@Slf4j
@RequiredArgsConstructor
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final KafkaProducerService kafkaProducerService;
    private final AuthenticationManager authenticationManager;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final JWTUtil jwtUtil;
    private final RefreshService refreshService;

    // loginRequest를 필드에 저장하여 재사용
    private LoginRequest loginRequest;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
        HttpServletResponse response) throws AuthenticationException {
        try {
            this.loginRequest = parseLoginRequest(request); // 파싱한 값을 필드에 저장
            System.out.println("===================================================");
            return authenticateUser(this.loginRequest);
        } catch (IOException | AuthenticationException e) {
            try {
                handleException(response, e);
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
            return null;
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
        HttpServletResponse response, FilterChain chain, Authentication authentication)
        throws IOException {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        Integer id = userDetails.getUserId();
        String username = userDetails.getUsername();
        String name = userDetails.getName();

        log.info("id: {}, username: {}", id, username);

        // 저장된 loginRequest를 재사용하여 fcmToken을 추출
        String fcmToken = this.loginRequest.fcmToken();

        kafkaProducerService.sendFcmToken("fcm-topic", FcmTokenMessageResponse.of(id, fcmToken));

        String access = jwtUtil.createJwt("access", id, username, name, ACCESS_TOKEN_EXPIRATION);
        String refresh = jwtUtil.createJwt("refresh", id, username, name, REFRESH_TOKEN_EXPIRATION);

        refreshService.saveRefreshToken(refresh, username);

        response.setHeader("access", access);
        response.setStatus(HttpStatus.OK.value());

        Cookie cookie = CookieUtil.createCookie("refresh", refresh);
        CookieUtil.addSameSiteCookieAttribute(response, cookie);

        LoginUserResponse loginUserResponse = LoginUserResponse.of(userDetails);
        CommonResponse<LoginUserResponse> responseBody = CommonResponse.ok(
            "Authentication successful", loginUserResponse);

        sendResponse(response, HttpStatus.OK, responseBody);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
        HttpServletResponse response, AuthenticationException failed) throws IOException {
        CommonResponse<String> errorResponse = CommonResponse.unauthorized("Authentication failed");
        sendResponse(response, HttpStatus.UNAUTHORIZED, errorResponse);
    }

    private LoginRequest parseLoginRequest(HttpServletRequest request) throws IOException {
        String messageBody = StreamUtils.copyToString(request.getInputStream(),
            StandardCharsets.UTF_8);
        log.info("messageBody: {}", messageBody);
        return objectMapper.readValue(messageBody, LoginRequest.class);
    }

    private Authentication authenticateUser(LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
            loginRequest.username(), loginRequest.password());
        return authenticationManager.authenticate(authToken);
    }

    private void handleException(HttpServletResponse response, Exception e) throws IOException {
        CommonResponse<String> errorResponse = CommonResponse.badRequest(
            "Authentication failed" + ": " + e.getMessage());
        sendResponse(response, HttpStatus.BAD_REQUEST, errorResponse);
    }

    private <T> void sendResponse(HttpServletResponse response, HttpStatus status,
        CommonResponse<T> body) throws IOException {
        response.setStatus(status.value());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(objectMapper.writeValueAsString(body));
    }
}