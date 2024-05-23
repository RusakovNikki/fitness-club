package ru.api.fitnessclub.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ru.api.fitnessclub.models.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {

}