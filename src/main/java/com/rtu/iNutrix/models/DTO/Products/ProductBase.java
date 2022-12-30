package com.rtu.iNutrix.models.DTO.Products;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.rtu.iNutrix.models.entities.DietProduct;
import com.rtu.iNutrix.models.entities.Product;
import com.rtu.iNutrix.models.entities.ProductCustom;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;


@Getter
@Setter
@AllArgsConstructor
public class ProductBase {

    protected UUID productId;

    protected String name;

    protected double amount;

    protected ProductGroupDTO productGroup;

    @JsonProperty("isCustom")
    protected boolean isCustom;


    public ProductBase(Product entity){
        this.productId = entity.getId();
        this.name = entity.getName();
        this.amount = 0;
        this.productGroup = new ProductGroupDTO(entity.getProductGroup());
        this.isCustom = false;
    }

    public ProductBase(ProductCustom entity){
        this.productId = entity.getId();
        this.name = entity.getName();
        this.amount = 0;
        this.productGroup = new ProductGroupDTO(entity.getProductGroup());
        this.isCustom = true;
    }

    public ProductBase(){

    }

}
