package com.example.demoauth.service;

import org.springframework.stereotype.Service;

import com.example.demoauth.repository.RoleRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RoleService {
    private RoleRepository roleRepository;

}
