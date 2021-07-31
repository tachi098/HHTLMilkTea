package com.fpt.hhtlmilkteaapi.payload.response;

import com.fpt.hhtlmilkteaapi.entity.Spinner;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SpinnerResponse {

    private List<Spinner> spinners;
    private List<String> segments;
    private List<String> segColors;

}
