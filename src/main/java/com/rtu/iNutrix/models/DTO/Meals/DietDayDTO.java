package com.rtu.iNutrix.models.DTO.Meals;


import com.google.api.client.util.DateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DietDayDTO {


    private ZonedDateTime date;

    private DietDayMetaData dietDayMetadata;
}
