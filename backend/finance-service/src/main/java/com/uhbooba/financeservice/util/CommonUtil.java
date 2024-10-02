package com.uhbooba.financeservice.util;

import org.springframework.http.HttpHeaders;

public class CommonUtil {

    public static Integer getMemberId(HttpHeaders headers) {
        return 1;
        //        return Integer.valueOf(headers.get("member-passport")
        //                                      .get(0));
    }
}
