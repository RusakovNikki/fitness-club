package com.example.demoauth.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demoauth.models.InventoryModel;
import com.example.demoauth.service.InventoryService;

@RestController
@RequestMapping("api/v1")
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/inventory")
    @PreAuthorize("hasRole('USER') or hasRole('TRAINER') or hasRole('ADMIN')")
    public List<InventoryModel> getInventory() {
        return inventoryService.getAllInventory();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/inventory")
    @PreAuthorize("hasRole('USER') or hasRole('TRAINER') or hasRole('ADMIN')")
    public InventoryModel createInventory(@RequestBody InventoryModel inventory) {
        return inventoryService.createInventory(inventory);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/inventory/{inventoryId}/assign-user")
    @PreAuthorize("hasRole('USER') or hasRole('TRAINER') or hasRole('ADMIN')")
    public InventoryModel assignUserToInventory(@PathVariable Long inventoryId, @RequestParam Long userId) {
        InventoryModel inventory = inventoryService.assignUserToInventory(inventoryId, userId);

        return inventory;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/inventory/{inventoryId}/remove-user")
    @PreAuthorize("hasRole('USER') or hasRole('TRAINER') or hasRole('ADMIN')")
    public InventoryModel removeUserFromInventory(@PathVariable Long inventoryId) {
        InventoryModel inventory = inventoryService.removeUserFromInventory(inventoryId);

        return inventory;
    }
}
