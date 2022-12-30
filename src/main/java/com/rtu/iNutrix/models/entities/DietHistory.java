package com.rtu.iNutrix.models.entities;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name="`DietHistory`")
public class DietHistory extends BaseEntity{

    @Column(name = "from_date", columnDefinition = "timestamptz not null")
    private ZonedDateTime fromDate = ZonedDateTime.now(ZoneOffset.UTC);

    @Column(name = "to_date", columnDefinition = "timestamptz not null")
    private ZonedDateTime toDate = ZonedDateTime.now(ZoneOffset.UTC);

    @Column(name = "is_current")
    private boolean isCurrent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diet_id", nullable = false)
    private Diet diet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "dietHistory")
    private Set<DietProgress> dietProgress;
}
