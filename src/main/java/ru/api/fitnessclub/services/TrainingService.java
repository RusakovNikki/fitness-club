package ru.api.fitnessclub.services;

import org.springframework.stereotype.Service;
import ru.api.fitnessclub.models.TrainingModel;
import ru.api.fitnessclub.repositories.TrainingRepository;

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
