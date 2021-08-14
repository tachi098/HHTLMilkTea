package com.fpt.hhtlmilkteaapi.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WheelHistoryRequest {

    private String fullName;
    private String username;
    private String reward;
    private int mark;
    private String type;

}
