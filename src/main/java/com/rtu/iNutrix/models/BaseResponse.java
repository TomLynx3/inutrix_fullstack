package com.rtu.iNutrix.models;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BaseResponse {
    private Boolean success = false;
    private Object result;
    private ApiError error;
}
