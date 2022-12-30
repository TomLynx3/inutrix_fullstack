package com.rtu.iNutrix.models.DTO.Diet;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class SetActiveDietDTO {


    private ZonedDateTime fromDate;

    private UUID dietId;
}
