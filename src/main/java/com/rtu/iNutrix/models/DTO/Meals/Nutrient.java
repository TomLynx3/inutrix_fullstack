package com.rtu.iNutrix.models.DTO.Meals;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Nutrient {


    private String name;

    private double minimumValue;

    private double maximumValue;
}
