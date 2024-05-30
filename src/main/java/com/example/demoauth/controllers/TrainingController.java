package com.example.demoauth.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import com.example.demoauth.service.TrainingService;
import com.example.demoauth.models.TrainingModel;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class TrainingController {
    private TrainingService trainingService;

    @GetMapping("/trainings")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<TrainingModel> getAllTrainings() {
        return trainingService.getAllTrainings();
    }

    @GetMapping("/trainings/group")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<TrainingModel> getGroupTrainings() {
        return trainingService.getGroupTrainings();
    }

    // @GetMapping("/trainings/group")
    // public List<TrainingModel> getIndividualTrainings() {
    // return trainingService.getGroupTrainings();
    // }

    @PostMapping("/trainings")
    @CrossOrigin(origins = "http://localhost:3000")
    public TrainingModel createTraining(@RequestBody TrainingModel training) {
        return trainingService.createTraining(training);
    }

    @DeleteMapping("/trainings/{trainingId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public Boolean deleteTrainingById(@PathVariable Long trainingId) {
        return trainingService.deleteTrainingById(trainingId);
    }
}
