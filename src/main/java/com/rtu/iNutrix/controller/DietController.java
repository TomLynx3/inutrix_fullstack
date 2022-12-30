package com.rtu.iNutrix.controller;


import com.rtu.iNutrix.models.BaseResponse;
import com.rtu.iNutrix.models.DTO.Diet.SetActiveDietDTO;
import com.rtu.iNutrix.models.DTO.Diet.UpdateDietProgress;
import com.rtu.iNutrix.models.DTO.Diet.UpdateProgressDayDTO;
import com.rtu.iNutrix.service.interfaces.DietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diets")
public class DietController {


    private final DietService _dietService;

    @Autowired
    public DietController(DietService dietService){
        this._dietService = dietService;
    }

    @GetMapping("/active")
    public BaseResponse getActiveDiet()  {

        BaseResponse res = new BaseResponse();

        res.setResult(_dietService.getCurrentDietProgress());
        res.setSuccess(true);

        return res;
    }

    @PostMapping("/set-active")
    public  BaseResponse setActiveDiet(@RequestBody SetActiveDietDTO data){
        BaseResponse res = new BaseResponse();

        _dietService.setActiveDiet(data);
        res.setSuccess(true);

        return res;
    }

    @GetMapping("/any-active")
    public BaseResponse checkIsAnyActiveDiet(){
        BaseResponse res = new BaseResponse();

        res.setResult(_dietService.anyActiveDiet());
        res.setSuccess(true);

        return  res;
    }

    @PostMapping("/update")
    public BaseResponse updateDietProgress(@RequestBody UpdateDietProgress progress){
        BaseResponse res = new BaseResponse();

        _dietService.updateDietProgress(progress);
        res.setSuccess(true);
        return res;
    }
}
