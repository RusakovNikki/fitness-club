package ru.api.fitnessclub.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ru.api.fitnessclub.models.UserModel;

@Repository
public interface UserRepository extends CrudRepository<UserModel, Long> {
    List<UserModel> findAllByName(String name);

    Optional<UserModel> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
