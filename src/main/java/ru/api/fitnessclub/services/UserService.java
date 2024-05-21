package ru.api.fitnessclub.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import ru.api.fitnessclub.models.UserModel;
import ru.api.fitnessclub.repositories.UserRepository;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;

    public List<UserModel> getUsers() {
        return userRepository.findAll();
    }

    public void createUser(UserModel user) {
        userRepository.save(user);
    }
}
