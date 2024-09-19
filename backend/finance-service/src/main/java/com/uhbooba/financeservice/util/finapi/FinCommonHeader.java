package com.uhbooba.financeservice.util.finapi;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class FinCommonHeader {

    private static final AtomicInteger sequence = new AtomicInteger(0);
    private final String institutionCode = "00100"; // 기관 코드 고정
    private final String fintechAppNo = "001"; // 핀테크 앱 일련번호 고정

    @Value("${finopenapi.key")
    private String apiKey; // 금융 api key

    private String apiName; // API URL의 마지막 path 명
    private String transmissionDate; // 전송일자(YYYYMMDD)
    private String transmissionTime; // 전송시각(HHMMSS) 요청시간 기준 +- 5분
    private String apiServiceCode; // API Name 과 동일
    private String institutionTransactionUniqueNo; // 기관거래 고유 번호 : 임의로 생성(YYYYMMDD+HHMMSS+6자리)

    private FinCommonHeader() {
    }

    private FinCommonHeader(
        String apiName,
        ZonedDateTime now,
        String apiKey
    ) {
        this.apiKey = apiKey;
        this.apiName = apiName;
        this.transmissionDate = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        this.transmissionTime = now.format(DateTimeFormatter.ofPattern("HHmmss"));
        this.apiServiceCode = apiName;
        this.institutionTransactionUniqueNo = generateUniqueNo(transmissionDate + transmissionTime);
    }

    private static String generateUniqueNo(String now) {
        int sequenceNumber = sequence.getAndIncrement() % 1000000; // 6자리 일련번호 생성
        return now + String.format("%06d", sequenceNumber); // 기관거래고유번호 생성
    }

    /**
     * apiName 으로 헤더 만들기
     *
     * @param apiName : 호출 API URI 의 마지막 path 명
     * @return FinCommonHeader
     */
    public FinCommonHeader createHeader(String apiName) {
        LocalDateTime now = LocalDateTime.now();
        ZoneId SEOUL_ZONE = ZoneId.of("Asia/Seoul");
        ZonedDateTime koreaTime = now.atZone(ZoneId.systemDefault())
                                     .withZoneSameInstant(SEOUL_ZONE);

        return new FinCommonHeader(apiName, koreaTime, this.apiKey);
    }
}
