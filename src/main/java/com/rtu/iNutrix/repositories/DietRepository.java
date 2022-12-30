package com.rtu.iNutrix.repositories;

import com.rtu.iNutrix.models.entities.Diet;
import com.rtu.iNutrix.models.entities.DietProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface DietRepository extends JpaRepository<Diet, UUID> {

    @Query("SELECT d from Diet d WHERE d.user.id = :userId")
    List<Diet> getUserDiets(@Param("userId") String userId);
}