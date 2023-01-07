package com.rtu.iNutrix.models.entities;


import com.rtu.iNutrix.models.DTO.Diet.ConsumedProductDTO;
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
@Table(name="`ConsumedProduct`")
public class ConsumedProduct extends BaseEntity{


    public ConsumedProduct(ConsumedProductDTO dto,DietProgress dietProgress){
        this.productId = dto.getProductId();
        this.mealType = dto.getMealType();
        this.dietProgress = dietProgress;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diet_progress")
    private DietProgress dietProgress;

    private UUID productId;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "meal_type", nullable = false)
    private MealType mealType;



}
