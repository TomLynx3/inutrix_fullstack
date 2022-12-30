package com.rtu.iNutrix.repositories;

import com.rtu.iNutrix.models.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {
}