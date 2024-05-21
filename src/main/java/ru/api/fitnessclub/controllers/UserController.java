package ru.api.fitnessclub.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import ru.api.fitnessclub.services.UserService;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor // для инициализации в конструкторе userService
public class UserController {
    private UserService userService;

    @GetMapping("/welcome")
    public String welcome() {
        return "Hello world!";
    }
}
