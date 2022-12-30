package com.rtu.iNutrix.models.DTO.Meals;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public enum MealType {
    @JsonProperty("BREAKFAST")
    BREAKFAST,
    @JsonProperty("LUNCH")
    LUNCH,
    @JsonProperty("DINNER")
    DINNER;


    @JsonCreator
    public  static MealType fromText(String value){
        if(value.equals("BREAKFAST")){
            return BREAKFAST;
        }else if( value.equals("LUNCH")){
            return LUNCH;
        }else{
            return DINNER;
        }
    }
}
