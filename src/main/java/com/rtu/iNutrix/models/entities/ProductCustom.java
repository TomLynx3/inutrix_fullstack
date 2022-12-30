package com.rtu.iNutrix.models.entities;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import com.rtu.iNutrix.models.DTO.Products.ProductDTO;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name="`ProductCustom`")
public class ProductCustom extends  BaseEntity{

   public ProductCustom(ProductDTO productDTO, User user) {
        LookUpItem productGroup = new LookUpItem();
        productGroup.setId(productDTO.getProductGroup().getId());
        this.productGroup = productGroup;
        this.name = productDTO.getName();
        this.protein = productDTO.getProtein();
        this.fat = productDTO.getFat();
        this.carbohydrates = productDTO.getCarbohydrates();
        this.kJ = productDTO.getKJ();
        this.kcal = productDTO.getKcal();
        this.A = productDTO.getA();
        this.B1 = productDTO.getB1();
        this.B2 = productDTO.getB2();
        this.PP = productDTO.getPP();
        this.C = productDTO.getC();
        this.Ca = productDTO.getCa();
        this.P = productDTO.getP();
        this.Fe = productDTO.getFe();
        this.user = user;
        this.isActive = true;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_group", nullable = false)
    private LookUpItem productGroup;

    @Column(name = "name",nullable = false,length = 100)
    private String name;

    @Column(name = "protein",nullable = false)
    private double protein;

    @Column(name = "fat",nullable = false)
    private double fat;

    @Column(name = "carbohydrates",nullable = false)
    private double carbohydrates;

    @Column(name = "kj",nullable = false)
    private double kJ;

    @Column(name = "kcal",nullable = false)
    private double kcal;

    @Column(name = "A",nullable = false)
    private double A;

    @Column(name = "B1",nullable = false)
    private double B1;

    @Column(name = "B2",nullable = false)
    private double B2;

    @Column(name = "PP",nullable = false)
    private double PP;

    @Column(name = "C",nullable = false)
    private double C;

    @Column(name = "Ca",nullable = false)
    private double Ca;

    @Column(name = "P",nullable = false)
    private double P;

    @Column(name = "Fe",nullable = false)
    private double Fe;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name="is_active", nullable = false)
    private boolean isActive = true;

}
