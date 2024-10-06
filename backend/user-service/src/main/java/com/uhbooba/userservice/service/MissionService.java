package com.uhbooba.userservice.service;

import com.uhbooba.userservice.dto.response.MissionStatusResponse;
import com.uhbooba.userservice.entity.User;
import com.uhbooba.userservice.exception.NotFoundException;
import com.uhbooba.userservice.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MissionService {

    private final UserRepository userRepository;

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new NotFoundException(username + "가 존재하지 않습니다."));
    }

    @Transactional
    public void clearMission(String userId, int missionNumber) {
        User user = getUserByUsername(userId);

        user.updateMission(missionNumber);
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public boolean isMissionCleared(String userId, int missionNumber) {
        User user = getUserByUsername(userId);
        return (user.getMissionStatus() & (1 << missionNumber)) != 0;
    }

    @Transactional(readOnly = true)
    public List<MissionStatusResponse> getClearedMissionCount(String userId) {
        User user = getUserByUsername(userId);

        int status = user.getMissionStatus();
        List<MissionStatusResponse> missionStatusList = new ArrayList<>();

        for (int i = 0; i < 7; i++) {
            boolean isCleared = (status & (1 << i)) != 0;
            missionStatusList.add(MissionStatusResponse.of(i + 1, isCleared));
        }

        return missionStatusList;
    }

}
