package com.uhbooba.financeservice.service.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.uhbooba.financeservice.dto.UserHeaderInfo;
import com.uhbooba.financeservice.service.UserAccountService;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaConsumerService {

    private final UserAccountService userAccountService;

    @KafkaListener(topics = "user-signup-topic")
    public void userAccountRegister(String kafkaMessage) {
        log.info("kafka message : " + kafkaMessage);
        Map<Object, Object> map = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();

        try {
            map = mapper.readValue(kafkaMessage, new TypeReference<HashMap<Object, Object>>() {});
        } catch(JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        UserHeaderInfo headerInfo = UserHeaderInfo.builder()
                                                  .userId((Integer) map.get("id"))
                                                  .name((String) map.get("name"))
                                                  .build();
        userAccountService.checkOrCreateUserAccount(headerInfo);
    }

}
