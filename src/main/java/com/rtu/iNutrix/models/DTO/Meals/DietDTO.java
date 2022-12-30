package com.rtu.iNutrix.models.DTO.Meals;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DietDTO {

    private List<DietDayDTO> dietDays;
    private DietDetails dietDetails;
}
