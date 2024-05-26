package com.example.demoauth.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demoauth.models.UserModel;
import com.example.demoauth.service.UserService;

@RestController
@RequestMapping("api/v1")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/welcome")
    public String welcome() {
        return "Hello world!";
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('USER') or hasRole('TRAINER') or hasRole('ADMIN')")
    public List<UserModel> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/users/search/{name}")
    public List<UserModel> getUsersByName(@PathVariable String name) {
        return userService.getUsersByName(name);
    }

    @PutMapping("/users/{userId}/update-status")
    public UserModel userEntranceRegistration(@PathVariable Long userId,
            @RequestParam String status) {

        return userService.updateUserStatus(userId, status);
    }

    @PutMapping("/users/{userId}/add-subscription")
    public UserModel addSubscriptionToUser(@PathVariable Long userId, @RequestParam Long subscriptionId) {
        return userService.addSubscriptionToUser(userId, subscriptionId);
    }

}