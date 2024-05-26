package com.example.demoauth.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Data
@Entity
@Table(name = "subscription")
public class SubscriptionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /*
     * название абонемента
     */
    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Long price;

    @OneToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "subscription_id")
    @JsonManagedReference
    private List<UserModel> userList;
}
