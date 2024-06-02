package com.example.demoauth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demoauth.models.ERole;
import com.example.demoauth.models.RoleModel;

@Repository
public interface RoleRepository extends JpaRepository<RoleModel, Long> {
	Optional<RoleModel> findByName(ERole name);
}
