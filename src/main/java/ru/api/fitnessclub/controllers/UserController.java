package ru.api.fitnessclub.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.api.fitnessclub.models.UserModel;
import ru.api.fitnessclub.services.UserService;

@RestController
@RequestMapping("api/v1")
public class UserController {
    @Autowired
    // мы внедряем зависимость. Мы ищем (создаём) экземпляр класса,
    // и автоматически внедряем его сюда, т.к. сервис - тоже наследник от @Component
    private UserService userService;

    @GetMapping("/welcome")
    public String welcome() {
        return "Hello world!";
    }

    @GetMapping("/users")
    public List<UserModel> getUsers() {
        return userService.getUsers();
    }

    @PostMapping("/users")
    public String createUser(@RequestBody UserModel user) {
        userService.createUser(user);
        return "Success!";
    }

}
