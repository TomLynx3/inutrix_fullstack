package com.rtu.iNutrix.models.DTO.Diet;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UpdateProgressDayDTO {


    private ZonedDateTime date;

    private List<ConsumedProductDTO> products;
}
