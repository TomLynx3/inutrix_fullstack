package com.rtu.iNutrix.models.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
public class CreateUserRq {


    @NotNull
    private String token;

    @NotNull
    private UserDataDTO userData;
}
