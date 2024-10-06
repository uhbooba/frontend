package com.uhbooba.userservice.controller;

import com.uhbooba.userservice.dto.CommonResponse;
import com.uhbooba.userservice.service.MissionService;
import com.uhbooba.userservice.util.JWTUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/missions")
@Tag(name = "미션 관리", description = "미션 API 입니다.")
public class MissionController {

    private final MissionService missionService;
    private final JWTUtil jwtUtil;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "현재 몇 단계까지 완료했는지 확인")
    public CommonResponse<?> getClearedMissionCount(@RequestHeader("access") String access) {

        String username = jwtUtil.getUsername(access);
        int response = missionService.getClearedMissionCount(username);
        return CommonResponse.ok("미션 진행 단계 조회 성공", response);
    }

    @GetMapping("/{missionNumber}")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "특정 미션 클리어 여부 확인")
    public CommonResponse<?> isMissionCleared(@RequestHeader("access") String access,
        @PathVariable("missionNumber") int missionNumber) {

        String username = jwtUtil.getUsername(access);
        boolean response = missionService.isMissionCleared(username, missionNumber);
        return CommonResponse.ok("미션 클리어 여부 조회 성공", response);
    }

    @PatchMapping("/{missionNumber}")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "미션 클리어 설정")
    public CommonResponse<?> clearMission(@RequestHeader("access") String access,
        @PathVariable("missionNumber") int missionNumber) {

        String username = jwtUtil.getUsername(access);
        missionService.clearMission(username, missionNumber);
        return CommonResponse.ok("미션 클리어 성공");
    }

}
