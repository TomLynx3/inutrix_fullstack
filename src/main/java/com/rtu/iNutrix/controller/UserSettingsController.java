package com.rtu.iNutrix.controller;


import com.rtu.iNutrix.models.BaseResponse;
import com.rtu.iNutrix.models.DTO.CreateUserRq;
import com.rtu.iNutrix.models.DTO.UserDataDTO;
import com.rtu.iNutrix.repositories.UserRepository;
import com.rtu.iNutrix.service.interfaces.UserDataService;
import com.rtu.iNutrix.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/settings")
public class UserSettingsController {

    @Autowired
    private UserDataService _userDataService;

    @Autowired
    private UserService _userService;


    @GetMapping("")
    public BaseResponse getUserSettings(){
        BaseResponse res = new BaseResponse();


        res.setResult(_userDataService.getUserData());
        res.setSuccess(true);

        return res;
    }


    @PostMapping("")
    public BaseResponse saveUserSettings(@RequestBody UserDataDTO userData){
        BaseResponse res = new BaseResponse();

        _userService.saveUserData(userData,_userDataService.getUserID());
        res.setSuccess(true);


        return res;
    }

}
