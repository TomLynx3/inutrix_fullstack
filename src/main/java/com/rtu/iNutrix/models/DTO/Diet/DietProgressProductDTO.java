package com.rtu.iNutrix.models.DTO.Diet;


import com.rtu.iNutrix.models.DTO.Meals.MealType;
import com.rtu.iNutrix.models.DTO.Products.ProductBase;
import com.rtu.iNutrix.models.entities.DietProduct;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter

public class DietProgressProductDTO extends ProductBase {

    private boolean consumed;

    private MealType mealType;

    public DietProgressProductDTO(ProductBase base, boolean isConsumed){
        super(base.getProductId(), base.getName(), 0,base.getProductGroup(),base.isCustom());
        this.consumed = isConsumed;
    }

}
