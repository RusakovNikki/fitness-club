package com.example.demoauth.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demoauth.models.SubscriptionModel;
import com.example.demoauth.models.UserModel;
import com.example.demoauth.repository.SubscriptionRepository;
import com.example.demoauth.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SubscriptionService {
    private SubscriptionRepository subscriptionRepository;
    private UserRepository userRepository;

    public List<SubscriptionModel> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }

    public SubscriptionModel createSubscription(SubscriptionModel subscription) {
        return subscriptionRepository.save(subscription);
    }

    public Boolean deleteSubscriptionById(Long id) {
        subscriptionRepository.deleteById(id);
        return true;
    }

    public SubscriptionModel getSubByUserId(Long userId) {
        UserModel user = userRepository.findById(userId).orElse(null);

        // return subscriptionRepository.findBy
        return null;
    }
}
