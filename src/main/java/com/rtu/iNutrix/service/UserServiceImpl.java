package com.rtu.iNutrix.service;

import com.rtu.iNutrix.models.DTO.UserDataDTO;
import com.rtu.iNutrix.models.entities.LookUpItem;
import com.rtu.iNutrix.models.entities.User;
import com.rtu.iNutrix.repositories.UserRepository;
import com.rtu.iNutrix.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserServiceImpl implements UserService {


    @Autowired
    private UserRepository _userRepo;

    @Override
    public void saveUserData(UserDataDTO userDataDTO, String id) {

        Optional<User> userInDb = _userRepo.findById(id);

        User user;

        if(userInDb.isEmpty()){
            user = new User();
        }else{
            user = userInDb.get();
        }

        LookUpItem activityLevel = new LookUpItem();
        activityLevel.setId(userDataDTO.getActivityLevel());

        user.setId(id);
        user.setAge(userDataDTO.getAge());
        user.setHeight(userDataDTO.getHeight());
        user.setGender(userDataDTO.getGender());
        user.setWeight(userDataDTO.getBodyWeight());
        user.setActivityLevel(activityLevel);


        _userRepo.save(user);

    }
}
