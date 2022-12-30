package com.rtu.iNutrix.models.DTO.Meals;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DietDetails {

    private DietGoal dietGoal;
    private double kcal;
    private Object details;
}
