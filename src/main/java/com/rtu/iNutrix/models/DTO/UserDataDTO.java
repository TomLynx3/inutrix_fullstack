package com.rtu.iNutrix.models.DTO;



import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.UUID;


@Getter
@Setter
@NoArgsConstructor
public class UserDataDTO {

    @NotNull
    private double bodyWeight;

    @NotNull
    private  int age;

    @NotNull
    private  double height;

    @NotNull
    private  char gender;

    @NotNull
    private UUID activityLevel;


}
