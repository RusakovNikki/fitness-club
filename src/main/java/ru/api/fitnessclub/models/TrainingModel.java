package ru.api.fitnessclub.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "training")
@EqualsAndHashCode(callSuper = false)
public class TrainingModel extends BaseModel {

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
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserModel user;

    @ManyToOne
    @JoinColumn(name = "trainer_id", referencedColumnName = "id")
    private UserModel trainer;
}
