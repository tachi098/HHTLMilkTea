package com.fpt.hhtlmilkteaapi.payload.response;

import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {

    private String token;
    private String type = "Bearer";
    private long jwtExpirationMs;
    private long id;
    private String username;
    private String fullName;
    private Date birthday; // 1995-10-29
    private String address;
    private String phone;
    private String linkImage;
    private String nameImage;
    private String email;
    private List<String> roles;
    private Date createdAt;
    private Date updatedAt;

    public JwtResponse(String token, long jwtExpirationMs, long id, String username, String fullName,
                       Date birthday, String address, String phone, String linkImage,
                       String nameImage, String email, List<String> roles, Date createdAt, Date updatedAt) {
        this.token = token;
        this.jwtExpirationMs = jwtExpirationMs;
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.birthday = birthday;
        this.address = address;
        this.phone = phone;
        this.linkImage = linkImage;
        this.nameImage = nameImage;
        this.email = email;
        this.roles = roles;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
