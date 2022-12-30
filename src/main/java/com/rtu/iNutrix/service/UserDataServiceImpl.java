package com.rtu.iNutrix.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.rtu.iNutrix.models.DTO.UserDataDTO;
import com.rtu.iNutrix.models.entities.User;
import com.rtu.iNutrix.repositories.UserRepository;
import com.rtu.iNutrix.service.interfaces.UserDataService;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;


@Component
@Scope(value = "request",proxyMode = ScopedProxyMode.TARGET_CLASS)
public class UserDataServiceImpl implements UserDataService {




    private User _user;
    private UserRepository _userRepo;


    public UserDataServiceImpl(UserRepository userRepo){
        _userRepo = userRepo;

        GoogleIdToken userDataFromToken = (GoogleIdToken) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        _user = _userRepo.findById(userDataFromToken.getPayload().getUserId()).get();
    }

    @Override
    public UserDataDTO getUserData() {
        UserDataDTO dto = new UserDataDTO();
        dto.setBodyWeight(_user.getWeight());
        dto.setGender(_user.getGender());
        dto.setAge(_user.getAge());
        dto.setHeight(_user.getHeight());
        dto.setActivityLevel(_user.getActivityLevel().getId());
        return dto;
    }

    @Override
    public String getUserID() {
        return _user.getId();
    }

    @Override
    public User getUser() {
        return _user;
    }
}
