package com.example.demoauth.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demoauth.models.SubscriptionModel;
import com.example.demoauth.service.SubscriptionService;

@RestController
@RequestMapping("api/v1")
public class SubscriptionController {
    @Autowired
    private SubscriptionService subscriptionService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/subscriptions")
    public List<SubscriptionModel> getAllSubscriptions() {
        return subscriptionService.getAllSubscriptions();
    }

    // @CrossOrigin(origins = "http://localhost:3000")
    // @GetMapping("/subscriptions")
    // public SubscriptionModel getSubByUserId(@RequestParam Long userId) {

    // return subscriptionService.getSubByUserId(userId);
    // }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/subscriptions")
    public SubscriptionModel createSubscription(@RequestBody SubscriptionModel subscription) {
        return subscriptionService.createSubscription(subscription);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/subscriptions/{subscriptionId}")
    public Boolean deleteSubscriptionById(@PathVariable Long subscriptionId) {
        subscriptionService.deleteSubscriptionById(subscriptionId);
        return true;
    }
}
