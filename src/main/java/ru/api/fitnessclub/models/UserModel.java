package ru.api.fitnessclub.models;

import lombok.Data;

@Data
public class UserModel {
    public Long id;
    private String name;
    private String password;
    private String role;
}
