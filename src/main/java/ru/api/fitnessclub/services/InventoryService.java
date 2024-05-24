package ru.api.fitnessclub.services;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import ru.api.fitnessclub.models.InventoryModel;
import ru.api.fitnessclub.models.UserModel;
import ru.api.fitnessclub.repositories.InventoryRepository;
import ru.api.fitnessclub.repositories.UserRepository;

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
        InventoryModel inventory = inventoryRepository.findById(inventoryId).orElseThrow();
        UserModel user = userRepository.findById(userId).orElseThrow();

        inventory.setUser(user);
        return inventoryRepository.save(inventory);
    }
}
