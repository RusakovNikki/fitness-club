package com.example.demoauth.models;

import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity
@Table(name = "training")
public class TrainingModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private LocalDateTime date;

    /*
     * Тип тренировки - "Групповая/Индивидуальная"
     */
    @Column(name = "type")
    private String type;

    @Column(name = "name")
    private String name;

    @ManyToOne
    private UserModel trainer; // Тренер, связанный с тренировкой

    @ManyToMany
    @JoinTable(name = "user_training", joinColumns = @JoinColumn(name = "training_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<UserModel> users; // Ученики, участвующие в тренировке
}
