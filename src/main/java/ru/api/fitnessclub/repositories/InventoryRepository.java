package ru.api.fitnessclub.repositories;

import org.springframework.stereotype.Repository;

import ru.api.fitnessclub.models.InventoryModel;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface InventoryRepository extends JpaRepository<InventoryModel, Long> {

}