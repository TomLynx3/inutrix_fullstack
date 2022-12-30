package com.rtu.iNutrix.models.DTO.Diet;

import java.time.ZonedDateTime;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DietProgressDay {


    private ZonedDateTime date;


    private List<DietProgressProductDTO> products;
}