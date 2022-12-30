package com.rtu.iNutrix.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ApiError {
    private String message;
    private String errorCode;
}
