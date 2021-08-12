package com.fpt.hhtlmilkteaapi.payload.response;

import com.fpt.hhtlmilkteaapi.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartResponse {
    private Order order;
    private int quantity;
    private long totalPrice;
}
