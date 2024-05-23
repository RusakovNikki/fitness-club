package ru.api.fitnessclub.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "subscription")
@EqualsAndHashCode(callSuper = false)
public class SubscriptionModel extends BaseModel {

    /*
     * название абонемента
     */
    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Long price;
}
