package com.rtu.iNutrix.service.interfaces;

import com.rtu.iNutrix.models.DTO.Diet.DietProgressDTO;
import com.rtu.iNutrix.models.DTO.Diet.SetActiveDietDTO;
import com.rtu.iNutrix.models.DTO.Diet.UpdateDietProgress;
import com.rtu.iNutrix.models.DTO.Diet.UpdateProgressDayDTO;
import com.rtu.iNutrix.models.DTO.Meals.DietMetadata;

import java.util.List;

public interface DietService {

    DietProgressDTO getCurrentDietProgress();
    void updateDietProgress(UpdateDietProgress progress);
    List<DietMetadata> getDietsMetadata();
    boolean anyActiveDiet();
    void setActiveDiet(SetActiveDietDTO data);
}
