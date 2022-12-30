package com.rtu.iNutrix.models.DTO.Diet;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class UpdateDietProgress {


    private UUID dietHistoryId;
    private List<UpdateProgressDayDTO> progress;
}
