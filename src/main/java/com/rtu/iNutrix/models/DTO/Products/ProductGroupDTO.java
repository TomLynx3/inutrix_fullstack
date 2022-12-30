package com.rtu.iNutrix.models.DTO.Products;


import com.rtu.iNutrix.models.entities.LookUpItem;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class ProductGroupDTO {

    private String groupName;

    private UUID id;

    public ProductGroupDTO(LookUpItem entity){
        this.groupName = entity.getName();
        this.id = entity.getId();
    }
}
