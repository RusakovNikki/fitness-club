package ru.api.fitnessclub.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import ru.api.fitnessclub.models.SubscriptionModel;
import ru.api.fitnessclub.models.UserModel;
import ru.api.fitnessclub.repositories.SubscriptionRepository;
import ru.api.fitnessclub.repositories.UserRepository;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;
    private SubscriptionRepository subscriptionRepository;

    public List<UserModel> getUsers() {
        return userRepository.findAll();
    }

    public void createUser(UserModel user) {
        userRepository.save(user);
    }

    public List<UserModel> getUsersByName(String name) {
        return userRepository.findAllByName(name);
    }

    public UserModel updateUserStatus(Long userId, String status) {
        UserModel user = userRepository.findById(userId).orElseThrow();

        if (status.equalsIgnoreCase("ENTER")) {
            user.setEnteredAt(LocalDateTime.now());
            user.setLeftAt(null);
        } else if (status.equalsIgnoreCase("LEFT")) {
            user.setEnteredAt(null);
            user.setLeftAt(LocalDateTime.now());
        }

        user.setStatus(status);
        return userRepository.save(user);
    }

    public UserModel addSubscriptionToUser(Long userId, Long subId) {
        SubscriptionModel subscription = subscriptionRepository.findById(subId).orElse(null);
        UserModel user = userRepository.findById(userId).orElse(null);

        if (user != null && subscription != null) {
            // inventory.setUser(user);
            // return inventoryRepository.save(inventory);
            user.setSubscription(subscription);
            return userRepository.save(user);
        }

        return null;
    }
}