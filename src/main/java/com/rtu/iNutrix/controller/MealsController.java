package com.rtu.iNutrix.controller;


import com.rtu.iNutrix.models.BaseResponse;
import com.rtu.iNutrix.models.DTO.Meals.DietDTO;
import com.rtu.iNutrix.models.DTO.Meals.DietRequest;
import com.rtu.iNutrix.service.interfaces.DietService;
import com.rtu.iNutrix.service.interfaces.MealsService;
import com.rtu.iNutrix.utilities.errors.ApiErrorBuilder;
import com.rtu.iNutrix.utilities.errors.SolverErrorCodes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/meals")
public class MealsController {

    Logger logger = LoggerFactory.getLogger(MealsController.class);

    private final MealsService _mealsService;

    private  final DietService _dietService;


    @ExceptionHandler(Exception.class)
    public BaseResponse handleException(HttpServletRequest req, Exception ex) {

        BaseResponse res = new BaseResponse();

        if (ex instanceof SolverErrorCodes.SolutionNotFoundException) {
            ApiErrorBuilder.buildError(res,SolverErrorCodes.SolutionNotFound,ex.getLocalizedMessage());
        }
        logger.error(ex.getLocalizedMessage());

        return res;
    }

    @Autowired
    public MealsController(MealsService mealsService,DietService dietService){
        this._mealsService = mealsService;
        this._dietService = dietService;
    }


    @PostMapping("/create-diet")
    public  BaseResponse createDiet(@RequestBody DietRequest req) throws IllegalAccessException, SolverErrorCodes.SolutionNotFoundException {

        BaseResponse res = new BaseResponse();

        res.setResult(_mealsService.createDiet(req.getDays(),req.getDietGoal()));
        res.setSuccess(true);

        return res;
    }

    @PostMapping("/save-diet")
    public  BaseResponse saveDiet(@RequestBody DietDTO req)  {

        BaseResponse res = new BaseResponse();

        res.setResult(_mealsService.saveDiet(req));
        res.setSuccess(true);

        return res;
    }

    @GetMapping("/diets")
    public BaseResponse getUserDiets(){
        BaseResponse res = new BaseResponse();

        res.setResult(_dietService.getDietsMetadata());
        res.setSuccess(true);

        return  res;
    }
}
