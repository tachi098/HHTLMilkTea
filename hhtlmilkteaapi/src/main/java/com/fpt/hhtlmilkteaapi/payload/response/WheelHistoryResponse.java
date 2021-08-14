package com.fpt.hhtlmilkteaapi.payload.response;

import com.fpt.hhtlmilkteaapi.entity.User;
import com.fpt.hhtlmilkteaapi.entity.WheelHistory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WheelHistoryResponse {

    private List<WheelHistory> wheelHistories;
    private User user;

}
