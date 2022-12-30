package com.rtu.iNutrix.models.entities;


import com.rtu.iNutrix.models.DTO.Meals.DailyProduct;
import com.rtu.iNutrix.models.DTO.Meals.DietDayDTO;
import com.rtu.iNutrix.models.DTO.Meals.MealDTO;
import com.rtu.iNutrix.models.DTO.Meals.MealType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name="`DietProduct`")
public class DietProduct extends BaseEntity{

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "meal_type", nullable = false)
    private MealType mealType;

    @Column(name="product",nullable = false)
    private UUID productId;

    @Column(name="is_custom_product",nullable = false)
    private boolean isCustomProduct;

    @Column(name="amount",nullable = false)
    private double amount;

    @Column(name = "date", columnDefinition = "timestamptz not null")
    private ZonedDateTime date = ZonedDateTime.now(ZoneOffset.UTC);

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diet", nullable = false)
    private Diet diet;


    public DietProduct(DailyProduct dailyProduct, MealType mealType, Diet diet, ZonedDateTime date){

        this.mealType = mealType;
        this.productId = dailyProduct.getProductId();
        this.isCustomProduct = dailyProduct.isCustom();
        this.amount = dailyProduct.getAmount();
        this.date = date;
        this.diet = diet;
    }
}