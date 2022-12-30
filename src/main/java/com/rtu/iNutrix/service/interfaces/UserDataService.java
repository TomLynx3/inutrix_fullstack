package com.rtu.iNutrix.service.interfaces;

import com.rtu.iNutrix.models.DTO.UserDataDTO;
import com.rtu.iNutrix.models.entities.User;

public interface UserDataService {

    UserDataDTO getUserData();
    String getUserID();
    User getUser();
}
