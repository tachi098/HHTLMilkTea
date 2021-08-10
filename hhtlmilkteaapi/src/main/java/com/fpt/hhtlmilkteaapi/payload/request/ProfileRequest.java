package com.fpt.hhtlmilkteaapi.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileRequest {
    private String username;
    private String fullName;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date birthday; // 1995-10-29
    private String address;
    private String phone;
    private String email;
    private MultipartFile multipartFile;
}
