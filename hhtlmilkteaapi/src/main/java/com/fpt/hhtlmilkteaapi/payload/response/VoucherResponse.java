package com.fpt.hhtlmilkteaapi.payload.response;

import com.fpt.hhtlmilkteaapi.entity.Code;
import com.fpt.hhtlmilkteaapi.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VoucherResponse {

    private List<Code> codes;
    private User user;
    private String message;
    private WishlistResponse wishlistResponse;

}
