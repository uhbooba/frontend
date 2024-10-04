package com.uhbooba.userservice.exception;

public class SmsBadMessagingException extends RuntimeException {

    public SmsBadMessagingException() {
        super("문자 전송 오류입니다.");
    }
}
