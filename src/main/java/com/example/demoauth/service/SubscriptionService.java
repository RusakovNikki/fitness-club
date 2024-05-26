package com.example.demoauth.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demoauth.models.SubscriptionModel;
import com.example.demoauth.repository.SubscriptionRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SubscriptionService {
    private SubscriptionRepository subscriptionRepository;

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
}
