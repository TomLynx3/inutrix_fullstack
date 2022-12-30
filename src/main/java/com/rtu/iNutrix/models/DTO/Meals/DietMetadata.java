package com.rtu.iNutrix.models.DTO.Meals;


import com.rtu.iNutrix.models.entities.Diet;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class DietMetadata {

    private String name;
    private UUID id;
    private DietGoal dietGoal;
    private double kcal;
    private ZonedDateTime createdAt;
    private int days;


    public DietMetadata(Diet entity){
        this.id = entity.getId();
        this.dietGoal = entity.getDietGoal();
        this.kcal = entity.getKcal();
        this.createdAt = entity.getCreatedAt();
        this.days = entity.getDays();
    }

}
