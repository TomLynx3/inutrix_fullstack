package com.rtu.iNutrix.repositories;

import com.rtu.iNutrix.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {


}