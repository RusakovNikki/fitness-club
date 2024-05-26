package com.example.demoauth.service;

import org.springframework.stereotype.Service;
import com.example.demoauth.models.TrainingModel;
import com.example.demoauth.repository.TrainingRepository;

import java.util.List;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TrainingService {
    private TrainingRepository trainingRepository;

    public List<TrainingModel> getAllTrainings() {
        return trainingRepository.findAll();
    }

    public TrainingModel createTraining(TrainingModel training) {
        return trainingRepository.save(training);
    }

    public Boolean deleteTrainingById(Long id) {
        trainingRepository.deleteById(id);

        return true;
    }
}
