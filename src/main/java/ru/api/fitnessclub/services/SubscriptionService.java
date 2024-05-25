package ru.api.fitnessclub.services;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import ru.api.fitnessclub.models.SubscriptionModel;
import ru.api.fitnessclub.repositories.SubscriptionRepository;

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
