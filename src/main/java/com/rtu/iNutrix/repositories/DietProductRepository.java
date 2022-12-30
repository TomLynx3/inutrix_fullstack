package com.rtu.iNutrix.repositories;

import com.rtu.iNutrix.models.entities.DietProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface DietProductRepository extends JpaRepository<DietProduct, UUID>, JpaSpecificationExecutor<DietProduct> {

    @Query("SELECT dp from DietProduct dp WHERE dp.diet.id = :dietId")
    List<DietProduct> getDietProducts(@Param("dietId") UUID dietId);
}