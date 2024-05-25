package ru.api.fitnessclub.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ru.api.fitnessclub.models.RoleModel;

@Repository
public interface RoleRepository extends CrudRepository<RoleModel, Long> {
    Optional<RoleModel> findByName(String name);
}
