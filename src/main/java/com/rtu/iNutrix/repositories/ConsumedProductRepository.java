package com.rtu.iNutrix.repositories;

import com.rtu.iNutrix.models.entities.ConsumedProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ConsumedProductRepository extends JpaRepository<ConsumedProduct, UUID> {
}