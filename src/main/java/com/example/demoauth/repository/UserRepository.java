package com.example.demoauth.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demoauth.models.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {
	Optional<UserModel> findByUsername(String username);

	List<UserModel> findByUsernameContaining(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);
}
