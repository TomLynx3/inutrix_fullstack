package com.rtu.iNutrix.models.DTO.Meals;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Nutrients {


    public static Nutrients requiredNutrients(char gender,Nutrient protein, Nutrient fat,Nutrient carbohydrates, Nutrient kcal){

        Nutrient A;
        Nutrient B1;
        Nutrient B2;
        Nutrient PP;
        Nutrient C;
        Nutrient Ca;
        Nutrient P;
        Nutrient Fe;

        if(gender == 'M'){

            A = new Nutrient("A",0.7, 0.9);
            B1 = new Nutrient("B1",1,1.2);
            B2 = new Nutrient("B2",1,1.3);
            PP = new Nutrient("PP",14,16);
            C = new Nutrient("C",80,90);
            Ca = new Nutrient("Ca",850,1000);
            P = new Nutrient("P",800,1200);
            Fe = new Nutrient("Fe",13,20);
        }else{
            A = new Nutrient("A",0.6, 0.8);
            B1 = new Nutrient("B1",0.9,1.1);
            B2 = new Nutrient("B2",0.9,1.1);
            PP = new Nutrient("PP",12,14);
            C = new Nutrient("C",65,75);
            Ca = new Nutrient("Ca",850,1000);
            P = new Nutrient("P",700,1100);
            Fe = new Nutrient("Fe",13,25);
        }


        return new Nutrients(protein,fat,carbohydrates,kcal,A,B1,B2,PP,C,Ca,P,Fe);
    };

    private Nutrient protein;

    private Nutrient fat;

    private Nutrient carbohydrates;

    private Nutrient kcal;

    private Nutrient A;

    private Nutrient B1;

    private Nutrient B2;

    private Nutrient PP;

    private Nutrient C;

    private Nutrient Ca;

    private Nutrient P;

    private Nutrient Fe;

}
