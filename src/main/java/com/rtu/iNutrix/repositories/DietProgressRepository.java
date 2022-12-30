package com.rtu.iNutrix.repositories;

import com.rtu.iNutrix.models.entities.DietProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface DietProgressRepository extends JpaRepository<DietProgress, UUID> {

    @Query("SELECT dp from DietProgress dp WHERE dp.dietHistory.id = :dietHistoryId")
    List<DietProgress> getDietProgress(@Param("dietHistoryId") UUID dietHistoryId);
}