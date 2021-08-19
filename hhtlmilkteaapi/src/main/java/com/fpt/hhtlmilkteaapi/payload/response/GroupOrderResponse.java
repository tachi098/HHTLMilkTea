package com.fpt.hhtlmilkteaapi.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupOrderResponse {

    private List<GroupOrderInfoResponse> groupOrderInfoResponses;
    private long totalPriceGroup;

}
