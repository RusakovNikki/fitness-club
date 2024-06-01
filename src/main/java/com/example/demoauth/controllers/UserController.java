package com.example.demoauth.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demoauth.models.ERole;
import com.example.demoauth.models.RoleModel;
import com.example.demoauth.models.TrainingModel;
import com.example.demoauth.models.UserModel;
import com.example.demoauth.service.UserService;

@RestController
@RequestMapping("api/v1")
public class UserController {
    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/welcome")
    public String welcome() {
        return "Hello world!";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/users")
    @PreAuthorize("hasRole('USER') or hasRole('TRAINER') or hasRole('ADMIN')")
    public List<UserModel> getUsers() {
        return userService.getUsers();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/users/search")
    public List<UserModel> getUsersByName(@RequestParam(required = false) String name) {
        return userService.getUsersByName(name);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/users/{userId}/update-status")
    public UserModel userEntranceRegistration(@PathVariable Long userId,
            @RequestParam String status) {

        return userService.updateUserStatus(userId, status);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/users/{userId}/add-subscription")
    @PreAuthorize("hasRole('USER')")
    public UserModel addSubscriptionToUser(@PathVariable Long userId, @RequestParam Long subscriptionId) {
        return userService.addSubscriptionToUser(userId, subscriptionId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/users/{userId}")
    public UserModel getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    // @CrossOrigin(origins = "http://localhost:3000")
    // @GetMapping("/users/role")
    // public List<UserModel> getUsersByRole(@RequestParam String role) {
    // ERole eRole = ERole.valueOf(role);
    // return userService.getUsersByRole(eRole);
    // }

}
