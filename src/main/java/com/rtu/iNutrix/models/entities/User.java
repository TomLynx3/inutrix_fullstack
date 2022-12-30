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
@Table(name="`User`")
public class User {

    @Id
    private String id;

    @Column(name = "weight",nullable = false)
    private double weight;

    @Column(name = "gender", nullable = false)
    private char gender;

    @Column(name = "age", nullable = false)
    private int age;

    @Column(name = "height", nullable = false)
    private double height;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "activity_level", nullable = false)
    private LookUpItem activityLevel;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private Set<BannedProduct> bannedProducts;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private Set<Diet> diets;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private Set<DietHistory> dietHistories;
}
