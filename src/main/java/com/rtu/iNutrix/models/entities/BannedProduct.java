package com.rtu.iNutrix.models.entities;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name="`BannedProduct`")
public class BannedProduct extends BaseEntity{

    @Column(name = "product_id", nullable = false)
    private UUID productId;

    @Column(name = "is_custom", nullable = false)
    private boolean isCustomProduct;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
