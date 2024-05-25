package ru.api.fitnessclub.models;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Getter
@Setter
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email"),
})
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String email;

    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<ERole> roles = new HashSet<>();

    // в видео добавляли конструктор без параметров, с параметрами определенными,
    // геттеры, сеттеры

    // @Column(name = "entered_at")
    // private LocalDateTime enteredAt;

    // @Column(name = "left_at")
    // private LocalDateTime leftAt;

    // /*
    // * статус - "ПРИШЕЛ/УШЕЛ"
    // */
    // @Column(name = "status")
    // private String status;

    // @ManyToOne
    // @JsonBackReference
    // @JoinColumn(name = "subscription_id", referencedColumnName = "id")
    // private SubscriptionModel subscription;

    // @OneToMany(mappedBy = "user")
    // @JsonManagedReference
    // private List<InventoryModel> inventoryList;

    // @OneToMany(cascade = CascadeType.REMOVE)
    // @JoinColumn(name = "user_id")
    // private List<TrainingModel> userTraining;

    // @OneToMany(cascade = CascadeType.REMOVE)
    // @JoinColumn(name = "trainer_id")
    // private List<TrainingModel> trainerTraining;
}