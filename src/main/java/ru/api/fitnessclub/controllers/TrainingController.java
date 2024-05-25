package ru.api.fitnessclub.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import ru.api.fitnessclub.services.TrainingService;
import ru.api.fitnessclub.models.TrainingModel;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class TrainingController {
    private TrainingService trainingService;

    @GetMapping("/trainings")
    public List<TrainingModel> getAllTrainings() {
        return trainingService.getAllTrainings();
    }

    @PostMapping("/trainings")
    public TrainingModel createTraining(@RequestBody TrainingModel training) {
        return trainingService.createTraining(training);
    }

    @DeleteMapping("/trainings/{trainingId}")
    public Boolean deleteTrainingById(@PathVariable Long trainingId) {
        return trainingService.deleteTrainingById(trainingId);
    }
}
