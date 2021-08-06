package com.fpt.hhtlmilkteaapi.payload.response;

import com.fpt.hhtlmilkteaapi.entity.User;
import com.fpt.hhtlmilkteaapi.entity.Wishlist;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserReponse {

    private User user;
    private WishlistResponse wishlistResponse;

}
