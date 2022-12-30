package com.rtu.iNutrix.models.DTO.Meals;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import com.rtu.iNutrix.models.DTO.Products.ProductDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class DietDayMetaData {


    public DietDayMetaData(Nutrients nutrients)  {
        this.protein = new DailyNutrientAmount(nutrients.getProtein().getMinimumValue(), nutrients.getProtein().getMaximumValue(),0);
        this.carbohydrates = new DailyNutrientAmount(nutrients.getCarbohydrates().getMinimumValue(), nutrients.getCarbohydrates().getMaximumValue(),0);
        this.fat = new DailyNutrientAmount(nutrients.getFat().getMinimumValue(), nutrients.getFat().getMaximumValue(),0);
        this.kcal = new DailyNutrientAmount(nutrients.getKcal().getMinimumValue(), nutrients.getKcal().getMaximumValue(),0);
        this.A = new DailyNutrientAmount(nutrients.getA().getMinimumValue(), nutrients.getA().getMaximumValue(),0);
        this.B1 = new DailyNutrientAmount(nutrients.getB1().getMinimumValue(), nutrients.getB1().getMaximumValue(),0);
        this.B2 = new DailyNutrientAmount(nutrients.getB2().getMinimumValue(), nutrients.getB2().getMaximumValue(),0);
        this.PP = new DailyNutrientAmount(nutrients.getPP().getMinimumValue(), nutrients.getPP().getMaximumValue(),0);
        this.C = new DailyNutrientAmount(nutrients.getC().getMinimumValue(), nutrients.getC().getMaximumValue(),0);
        this.Ca = new DailyNutrientAmount(nutrients.getCa().getMinimumValue(), nutrients.getCa().getMaximumValue(),0);
        this.P = new DailyNutrientAmount(nutrients.getP().getMinimumValue(), nutrients.getP().getMaximumValue(),0);
        this.Fe = new DailyNutrientAmount(nutrients.getFe().getMinimumValue(), nutrients.getFe().getMaximumValue(),0);
    }

    private  List<MealDTO> meals;

    private List<DailyProduct> products;

    private DailyNutrientAmount protein;

    private DailyNutrientAmount fat;

    private DailyNutrientAmount carbohydrates;

    private DailyNutrientAmount kcal;

    @JsonProperty("A")
    private DailyNutrientAmount A;
    @JsonProperty("B1")
    private DailyNutrientAmount B1;
    @JsonProperty("B2")
    private DailyNutrientAmount B2;
    @JsonProperty("PP")
    private DailyNutrientAmount PP;
    @JsonProperty("C")
    private DailyNutrientAmount C;
    @JsonProperty("Ca")
    private DailyNutrientAmount Ca;
    @JsonProperty("P")
    private DailyNutrientAmount P;
    @JsonProperty("Fe")
    private DailyNutrientAmount Fe;


    public void setNutrientAmount(ProductDTO product, double value){
        this.protein.setActualValue(this.protein.getActualValue() + product.getProtein() * value);
        this.carbohydrates.setActualValue(this.carbohydrates.getActualValue() + product.getCarbohydrates() * value);
        this.fat.setActualValue(this.fat.getActualValue() + product.getFat() * value);
        this.kcal.setActualValue(this.kcal.getActualValue() + product.getKcal() * value);
        this.A.setActualValue(this.A.getActualValue() + product.getA() * value);
        this.B1.setActualValue(this.B1.getActualValue() + product.getB1() * value);
        this.B2.setActualValue(this.B2.getActualValue() + product.getB2() * value);
        this.PP.setActualValue(this.PP.getActualValue() + product.getPP() * value);
        this.C.setActualValue(this.C.getActualValue() + product.getC()  * value);
        this.Ca.setActualValue(this.Ca.getActualValue() + product.getCa() * value);
        this.P.setActualValue(this.P.getActualValue() + product.getP() * value);
        this.Fe.setActualValue(this.Fe.getActualValue() + product.getFe() * value);

    }
}
