package ru.api.fitnessclub.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.api.fitnessclub.models.InventoryModel;
import ru.api.fitnessclub.services.InventoryService;

@RestController
@RequestMapping("api/v1")
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;

    @GetMapping("/inventory")
    public List<InventoryModel> getInventory() {
        return inventoryService.getAllInventory();
    }

    @PostMapping("/inventory")
    public String createInventory(@RequestBody InventoryModel inventory) {
        inventoryService.createInventory(inventory);
        return "Success!";
    }
}
