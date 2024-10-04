package com.uhbooba.userservice.service;

import com.uhbooba.userservice.exception.SmsBadMessagingException;
import com.uhbooba.userservice.util.SmsCertificationUtil;
import java.util.Random;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class SmsService {

    private final SmsCertificationUtil smsCertificationUtil;
    private final StringRedisTemplate redisTemplate;
    private static final long VERIFICATION_CODE_EXPIRATION = 10;

    public void sendSms(String phone) {
        Random random = new Random();
        String certificationCode = String.format("%06d", random.nextInt(1000000));
        smsCertificationUtil.sendSMS(phone, certificationCode);

        redisTemplate.opsForValue()
            .set("sms:" + phone, certificationCode, VERIFICATION_CODE_EXPIRATION,
                TimeUnit.MINUTES);
    }

    public void verifySms(String phone, String code) {
        String storedCode = redisTemplate.opsForValue().get("sms:" + phone);

        if (storedCode == null || !storedCode.equals(code)) {
            throw new SmsBadMessagingException();
        }
    }

    public void sendTestSms(String phone) {
        Random random = new Random();
        String certificationCode = String.format("%06d", random.nextInt(1000000));

        log.info("certificationCode:{}", certificationCode);

        redisTemplate.opsForValue()
            .set("sms:" + phone, certificationCode, VERIFICATION_CODE_EXPIRATION,
                TimeUnit.MINUTES);
    }
}
