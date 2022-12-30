package com.rtu.iNutrix.models.DTO.Diet;


import com.rtu.iNutrix.models.DTO.Meals.DietGoal;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class DietProgressDTO {

    private UUID dietHistoryId;

    private List<DietProgressDay> days;

    private DietGoal dietGoal;

    private double kcal;


}
