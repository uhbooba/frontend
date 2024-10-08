package com.uhbooba.userservice.util;

import com.google.api.client.util.Key;

public class NotificationUtil {

    @Key
    private final String title;

    @Key
    private final String body;

    @Key
    private final String image;

    private NotificationUtil(String title, String body, String image) {
        this.title = title;
        this.body = body;
        this.image = image;
    }

}
