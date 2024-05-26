package com.example.demoauth.repository;

import org.springframework.stereotype.Repository;

import com.example.demoauth.models.InventoryModel;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface InventoryRepository extends JpaRepository<InventoryModel, Long> {

}