package com.example.demoauth.models;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "users", uniqueConstraints = {
		@UniqueConstraint(columnNames = "username"),
		@UniqueConstraint(columnNames = "email")
})
public class UserModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String username;

	private String email;

	private String password;

	//
	@Column(name = "entered_at")
	private LocalDateTime enteredAt;

	@Column(name = "left_at")
	private LocalDateTime leftAt;

	/*
	 * статус - "ПРИШЕЛ/УШЕЛ"
	 */
	@Column(name = "status")
	private String status;

	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "subscription_id", referencedColumnName = "id")
	private SubscriptionModel subscription;

	@OneToMany(mappedBy = "user")
	@JsonManagedReference
	private List<InventoryModel> inventoryList;

	@OneToMany
	@JoinColumn(name = "user_id")
	private List<TrainingModel> userTraining;

	@OneToMany
	@JoinColumn(name = "trainer_id")
	private List<TrainingModel> trainerTraining;

	//

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<RoleModel> roles = new HashSet<>();

	public UserModel(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}
}
