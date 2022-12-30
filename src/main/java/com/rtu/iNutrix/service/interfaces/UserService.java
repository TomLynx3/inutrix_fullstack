package com.rtu.iNutrix.service.interfaces;

import com.rtu.iNutrix.models.DTO.UserDataDTO;

public interface UserService {

    void saveUserData(UserDataDTO userDataDTO,String id);
}
