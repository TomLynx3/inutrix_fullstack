package com.rtu.iNutrix.models.DTO.Meals;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.rtu.iNutrix.utilities.deserializers.DietGoalDeserializer;

@JsonDeserialize(using = DietGoalDeserializer.class)
public enum DietGoal {
    @JsonProperty("MUSCLEGROWTH")
    MUSCLEGROWTH,
    @JsonProperty("BALANCEDIET")
    BALANCEDIET,
    @JsonProperty("WEIGHTLOSS")
    WEIGHTLOSS;


    @JsonCreator
    public  static DietGoal fromText(String value){
        if(value.equals("MUSCLEGROWTH")){
            return MUSCLEGROWTH;
        }else if( value.equals("BALANCEDIET")){
            return BALANCEDIET;
        }else{
            return WEIGHTLOSS;
        }
    }

    @Override
    public String toString(){
        if(this == MUSCLEGROWTH){
            return "MUSCLEGROWTH";
        }else if(this == BALANCEDIET){
            return "BALANCEDIET";
        }else{
            return "WEIGHTLOSS";
        }
    }
}
