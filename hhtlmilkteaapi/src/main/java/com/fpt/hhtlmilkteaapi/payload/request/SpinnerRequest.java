package com.fpt.hhtlmilkteaapi.payload.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SpinnerRequest {

    @NotBlank
    private String name;

    private String color;

}
