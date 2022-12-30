package com.rtu.iNutrix.repositories;

import com.rtu.iNutrix.models.entities.LookUpItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface LookUpItemRepository extends JpaRepository<LookUpItem, UUID> {

    @Query("SELECT lui FROM LookUpItem lui WHERE lui.lookUp.id = :lookUpId")
    List<LookUpItem> getLookUpItemsByLookUpId(@Param("lookUpId") UUID lookUpId);
}