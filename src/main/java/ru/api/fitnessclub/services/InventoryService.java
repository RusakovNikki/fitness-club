package ru.api.fitnessclub.services;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import ru.api.fitnessclub.models.InventoryModel;
import ru.api.fitnessclub.repositories.InventoryRepository;

@Service
@AllArgsConstructor
public class InventoryService {
    private InventoryRepository inventoryRepository;

    public List<InventoryModel> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public void createInventory(InventoryModel inventory) {
        inventoryRepository.save(inventory);
    }
}
