package com.rtu.iNutrix.models.DTO.Meals;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
public class DietRequest {

    @NotNull
    private int days;

    @NotNull
    private DietGoal dietGoal;


}
