package ru.api.fitnessclub.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "users")
@EqualsAndHashCode(callSuper = false)
public class UserModel extends BaseModel {

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "patronymic")
    private String patronymic;

    @Column(name = "mail")
    private String mail;

    @Column(name = "role")
    private String role;

    @Column(name = "entered_at")
    private LocalDateTime enteredAt;

    @Column(name = "left_at")
    private LocalDateTime leftAt;

    /*
     * статус - "ПРИШЕЛ/УШЕЛ"
     */
    @Column(name = "status")
    private String status;

    @Column(name = "password")
    private String password;

    /*
     * Связь многие к одному
     */
    // private Long subscription_id;
}
