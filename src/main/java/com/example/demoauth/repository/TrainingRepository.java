package com.example.demoauth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demoauth.models.TrainingModel;

public interface TrainingRepository extends JpaRepository<TrainingModel, Long> {

}