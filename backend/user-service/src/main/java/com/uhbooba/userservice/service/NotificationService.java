package com.uhbooba.userservice.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    public void sendPushNotification(String token, String title, String body) {
        Notification notification = Notification.builder()
            .setTitle(title)
            .setBody(body)
            .build();

        Message message = Message.builder()
            .setToken(token)
            .setNotification(notification)
            .build();

        try {
            String response = FirebaseMessaging.getInstance().send(message);
            System.out.println("======================푸시 알림 전송 성공: " + response);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
