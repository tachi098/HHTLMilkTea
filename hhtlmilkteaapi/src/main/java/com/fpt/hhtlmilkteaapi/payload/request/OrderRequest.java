package com.fpt.hhtlmilkteaapi.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    private String additionOption;
    private int quantity;
    private long priceCurrent;
    private String sizeOption;
    private String note;
    private Object product;
    private long userId;
}
