package com.rtu.iNutrix.service.interfaces;

import com.rtu.iNutrix.models.DTO.Meals.*;
import com.rtu.iNutrix.utilities.errors.SolverErrorCodes;

import java.util.List;
import java.util.UUID;

public interface MealsService {

    // DietDayMetaData getMealPlan() throws IllegalAccessException, InstantiationException;
     DietDayMetaData getDietDayMetadata(DietGoal goal) throws IllegalAccessException, SolverErrorCodes.SolutionNotFoundException;

     DietDTO createDiet(int days,DietGoal goal) throws IllegalAccessException, SolverErrorCodes.SolutionNotFoundException;

     List<MealDTO> getMealsForDay(List<DailyProduct> products) throws SolverErrorCodes.SolutionNotFoundException;

     UUID saveDiet(DietDTO diet);

     DietDTO getCurrentDiet();
}
