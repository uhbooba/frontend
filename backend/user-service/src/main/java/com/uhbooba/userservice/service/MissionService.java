package com.uhbooba.userservice.service;

import com.uhbooba.userservice.entity.User;
import com.uhbooba.userservice.exception.NotFoundException;
import com.uhbooba.userservice.repository.UserRepository;
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
        user.setMissionCleared(missionNumber);
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public boolean isMissionCleared(String userId, int missionNumber) {
        User user = getUserByUsername(userId);
        return user.isMissionCleared(missionNumber);
    }

    @Transactional(readOnly = true)
    public int getClearedMissionCount(String userId) {
        User user = getUserByUsername(userId);
        return user.getClearedMissionCount();
    }

}
