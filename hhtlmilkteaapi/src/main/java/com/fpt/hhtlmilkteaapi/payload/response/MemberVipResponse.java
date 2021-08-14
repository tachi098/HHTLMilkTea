package com.fpt.hhtlmilkteaapi.payload.response;

import com.fpt.hhtlmilkteaapi.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberVipResponse {

    private User user;

}
