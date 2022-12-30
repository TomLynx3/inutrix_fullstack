package com.rtu.iNutrix.repositories;

import com.rtu.iNutrix.models.entities.DietHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DietHistoryRepository extends JpaRepository<DietHistory, UUID> {

    @Query(value = "SELECT dh FROM  DietHistory dh WHERE dh.user.id = :userId and dh.isCurrent = true")
    Optional<DietHistory> getUserCurrentDiet(@Param("userId") String userId);
}