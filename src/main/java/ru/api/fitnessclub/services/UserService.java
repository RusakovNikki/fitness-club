package ru.api.fitnessclub.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import ru.api.fitnessclub.models.UserModel;

@Service
public class UserService {
    public List<UserModel> userModel = new ArrayList<>();

    public List<UserModel> getUsers() {
        return userModel;
    }

    public void createUser(UserModel user) {
        userModel.add(user);
    }
}
