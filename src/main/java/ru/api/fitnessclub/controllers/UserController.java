package ru.api.fitnessclub.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ru.api.fitnessclub.models.UserModel;
import ru.api.fitnessclub.services.UserService;

@RestController
@RequestMapping("api/v1")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/welcome")
    public String welcome() {
        return "Hello world!";
    }

    // TMP
    @GetMapping("/secured")
    public String secured() {
        return "secured!";
    }

    @GetMapping("/admin")
    public String admin() {
        return "admin!";
    }
    //

    @GetMapping("/users")
    public List<UserModel> getUsers() {
        // return userService.getUsers();
        return null;
    }

    @PostMapping("/users")
    public String createUser(@RequestBody UserModel user) {
        // userService.createUser(user);
        return "Success!";
    }

    @GetMapping("/users/search/{name}")
    public List<UserModel> getUsersByName(@PathVariable String name) {
        // return userService.getUsersByName(name);
        return null;
    }

    @PutMapping("/users/{userId}/update-status")
    public UserModel userEntranceRegistration(@PathVariable Long userId,
            @RequestParam String status) {

        // return userService.updateUserStatus(userId, status);
        return null;
    }

    @PutMapping("/users/{userId}/add-subscription")
    public UserModel addSubscriptionToUser(@PathVariable Long userId, @RequestParam Long subscriptionId) {
        // return userService.addSubscriptionToUser(userId, subscriptionId);
        return null;
    }

}
