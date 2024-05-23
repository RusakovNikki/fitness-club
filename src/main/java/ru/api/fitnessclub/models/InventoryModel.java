package ru.api.fitnessclub.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
@Table(name = "inventory")
public class InventoryModel extends BaseModel {

    @Column(name = "name")
    private String name;

    /*
     * статус - "ЗАБРАЛ/ВЕРНУЛ"
     */
    @Column(name = "status")
    private String status;

    @Column(name = "picked_at")
    private LocalDateTime pickedAt;

    @Column(name = "return_at")
    private LocalDateTime returnAt;

    /*
     * Связь многие к одному
     */
    // private Long user_id;
}
