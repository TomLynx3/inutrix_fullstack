package com.rtu.iNutrix.models.entities;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name="`DietProgress`")
public class DietProgress extends BaseEntity{

    @Column(name = "date", columnDefinition = "timestamptz not null")
    private ZonedDateTime date = ZonedDateTime.now(ZoneOffset.UTC);

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diet_history_id")
    private DietHistory dietHistory;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "dietProgress")
    private Set<ConsumedProduct> consumedProducts;
}
