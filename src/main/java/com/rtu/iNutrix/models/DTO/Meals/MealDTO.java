package com.rtu.iNutrix.models.DTO.Meals;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter

public class MealDTO {
    public MealDTO(MealType mealType, List<DailyProduct> dailyProductList) {
        this.mealType = mealType;
        this.products = dailyProductList;
    }
    private MealType mealType;

    private List<DailyProduct> products;


    public MealDTO(MealType type){
        this.mealType = type;
        this.products = new ArrayList<>();
    }

    public MealDTO(){

    }
}
