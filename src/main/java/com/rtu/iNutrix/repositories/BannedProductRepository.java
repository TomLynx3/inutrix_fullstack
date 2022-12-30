package com.rtu.iNutrix.repositories;

import com.rtu.iNutrix.models.entities.BannedProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface BannedProductRepository extends JpaRepository<BannedProduct, UUID> {

    List<BannedProduct> findByUser_id(String userId);

    @Transactional
    @Modifying
    @Query("DELETE FROM BannedProduct b WHERE b.productId in :ids and b.user.id = :userId")
    void deleteByIdAndUserId(@Param("ids")List<UUID> ids , @Param("userId") String userId);

}