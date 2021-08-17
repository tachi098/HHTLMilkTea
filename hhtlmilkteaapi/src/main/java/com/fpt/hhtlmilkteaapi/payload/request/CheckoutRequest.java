package com.fpt.hhtlmilkteaapi.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CheckoutRequest {
    private String orderId;
    private String address;
    private String phone;
    private int shipping;
    private String payment;
    private String note;
    private int totalPrice;
    private int memberVip;
    private int total;
}
