package com.example.demoauth.service;

import org.springframework.stereotype.Service;

import com.example.demoauth.models.ETrainings;
import com.example.demoauth.models.TrainingModel;
import com.example.demoauth.models.UserModel;
import com.example.demoauth.repository.TrainingRepository;
import com.example.demoauth.repository.UserRepository;

import java.util.List;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TrainingService {
    private TrainingRepository trainingRepository;
    private UserRepository userRepository;

    public List<TrainingModel> getAllTrainings() {
        return trainingRepository.findAll();
    }

    public List<TrainingModel> getGroupTrainings() {
        return trainingRepository.findAll().stream()
                .filter(training -> training.getType() != null && training.getType().length() > 0
                        && training.getType().equals(ETrainings.GROUP.toString()))
                .toList();
    }

    public TrainingModel createTraining(TrainingModel training) {
        // TrainingModel training = new TrainingModel();
        // UserModel user = userRepository.findById(trainerId).orElse(null);
        // training.setName(trainingName);
        // training.setTrainer(user);
        // training.setType(ETrainings.GROUP.toString());
        return trainingRepository.save(training);
    }

    public Boolean deleteTrainingById(Long id) {
        trainingRepository.deleteById(id);

        return true;
    }

    public TrainingModel joinUserToGroupTraining(Long userId, Long trainingId) {
        UserModel user = userRepository.findById(userId).orElse(null);
        TrainingModel training = trainingRepository.findById(trainingId).orElse(null);

        training.getUsers().add(user);
        return trainingRepository.save(training);
    }

}
