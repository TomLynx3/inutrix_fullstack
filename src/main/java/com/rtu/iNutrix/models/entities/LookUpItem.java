package com.rtu.iNutrix.models.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name="`LookUpItem`")
public class LookUpItem  extends BaseEntity{

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lookup_id", nullable = false)
    private LookUp lookUp;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "productGroup")
    private Set<Product> products;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "activityLevel")
    private Set<User> users;
}
