package ru.api.fitnessclub.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ru.api.fitnessclub.models.TrainingModel;

public interface TrainingRepository extends JpaRepository<TrainingModel, Long> {

}