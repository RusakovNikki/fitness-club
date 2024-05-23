package ru.api.fitnessclub.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
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

    @OneToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "subscription_id")
    private List<UserModel> userList;
}
