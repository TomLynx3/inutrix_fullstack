package com.rtu.iNutrix.models.DTO.Meals;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class  DailyNutrientAmount {

    private double minimumValue;
    private double maximumValue;
    private double actualValue;
}
