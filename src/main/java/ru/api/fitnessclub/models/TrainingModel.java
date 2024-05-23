package ru.api.fitnessclub.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

    /*
     * Связь многие ко многим у таблице users - users
     */
    // private Long user_id;
    // private Long trainer_id;
}
