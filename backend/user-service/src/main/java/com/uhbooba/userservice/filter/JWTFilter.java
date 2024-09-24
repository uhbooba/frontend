package com.uhbooba.userservice.filter;

import com.uhbooba.userservice.dto.CustomUserDetails;
import com.uhbooba.userservice.entity.User;
import com.uhbooba.userservice.exception.InvalidTokenException;
import com.uhbooba.userservice.exception.TokenExpiredException;
import com.uhbooba.userservice.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

        Optional<String> accessToken = Optional.ofNullable(request.getHeader("access"));

        if (accessToken.isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }

        validateAccessToken(accessToken.get(), response);

        setAuthentication(accessToken.get());

        filterChain.doFilter(request, response);
    }

    private void validateAccessToken(String accessToken, HttpServletResponse response)
        throws IOException {
        try {
            jwtUtil.isExpired(accessToken);
        } catch (ExpiredJwtException e) {
            throw new TokenExpiredException("access token가 만료되었습니다.");
        }

        if (!"access".equals(jwtUtil.getCategory(accessToken))) {
            throw new InvalidTokenException("refresh token이 아닙니다.");
        }
    }

    private void setAuthentication(String accessToken) {
        String username = jwtUtil.getUsername(accessToken);
        String name = jwtUtil.getName(accessToken);
        User user = new User(username, name);
        CustomUserDetails customUserDetails = new CustomUserDetails(user);

        Authentication authToken = new UsernamePasswordAuthenticationToken(
            customUserDetails, null, null);
        SecurityContextHolder.getContext().setAuthentication(authToken);
    }

}
