package com.uhbooba.userservice.util;

import jakarta.annotation.PostConstruct;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SmsCertificationUtil {

    @Value("${spring.coolsms.apikey}")
    private String apiKey;

    @Value("${spring.coolsms.secret}")
    private String secret;

    @Value("${spring.coolsms.from}")
    private String from;

    DefaultMessageService messageService;

    // 의존성 주입이 완료된 후 초기화
    @PostConstruct
    public void init() {
        this.messageService = NurigoApp.INSTANCE.initialize(apiKey, secret,
            "https://api.coolsms.co.kr");
    }

    public void sendSMS(String to, String certificationCode) {
        Message message = new Message();
        message.setFrom(from);
        message.setTo(to);
        message.setText("[어부바]본인확인 인증번호는 " + certificationCode + "입니다.");

        this.messageService.sendOne(new SingleMessageSendingRequest(message));
    }
}
