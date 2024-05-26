package com.example.demoauth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demoauth.models.SubscriptionModel;

@Repository
public interface SubscriptionRepository extends JpaRepository<SubscriptionModel, Long> {

}
