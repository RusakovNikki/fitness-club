package com.example.demoauth.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

import com.example.demoauth.models.EStatuses;
import com.example.demoauth.models.InventoryModel;
import com.example.demoauth.models.UserModel;
import com.example.demoauth.repository.InventoryRepository;
import com.example.demoauth.repository.UserRepository;

@Service
@AllArgsConstructor
public class InventoryService {
    private InventoryRepository inventoryRepository;
    private UserRepository userRepository;

    public List<InventoryModel> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public void createInventory(InventoryModel inventory) {
        inventoryRepository.save(inventory);
    }

    public InventoryModel assignUserToInventory(Long inventoryId, Long userId) {
        InventoryModel inventory = inventoryRepository.findById(inventoryId).orElse(null);
        UserModel user = userRepository.findById(userId).orElse(null);
        if (user != null && inventory != null) {
            inventory.setUser(user);
            inventory.setStatus(EStatuses.COME.toString());
            return inventoryRepository.save(inventory);
        }
        return null;
    }

    public InventoryModel removeUserFromInventory(Long inventoryId) {
        InventoryModel inventory = inventoryRepository.findById(inventoryId).orElseThrow();
        inventory.setUser(null);
        inventory.setStatus(EStatuses.LEAVE.toString());

        return inventoryRepository.save(inventory);
    }
}
