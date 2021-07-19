package com.fpt.hhtlmilkteaapi.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequest {

    private long id;
    private String username;
    private String fullName;
    private Date birthday; // 1995-10-29
    private int gender; // 0: Nam, 1: Nữ, 3: Khác
    private String address;
    private String postcode;
    private String phone;
    private MultipartFile avatar;
    private String email;
    private Set<String> roles;

}
