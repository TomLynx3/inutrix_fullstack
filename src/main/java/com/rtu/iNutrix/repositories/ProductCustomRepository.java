package com.rtu.iNutrix.repositories;

import com.rtu.iNutrix.models.entities.ProductCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface ProductCustomRepository extends JpaRepository<ProductCustom, UUID> {

    @Query("DELETE FROM ProductCustom pc WHERE pc.id in :ids")
    void deleteById(@Param("ids")List<UUID> ids );

    @Query("SELECT pc FROM ProductCustom pc WHERE pc.id in :ids and pc.user.id = :userId ")
    List<ProductCustom> findUserProductsByIds(@Param("userId") String userId, @Param("ids") List<UUID> ids);
    List<ProductCustom> findByUser_id(String userId);

    @Transactional
    @Modifying
    @Query("select pc from ProductCustom pc where pc.isActive = true and pc.user.id = :userId")
    List<ProductCustom> findUserActiveProducts(@Param("userId") String userId);

    @Transactional
    @Modifying
    @Query("update ProductCustom pc set pc.isActive = false where pc.id in :ids")
    void deleteByIds(@Param("ids")List<UUID> ids );


}