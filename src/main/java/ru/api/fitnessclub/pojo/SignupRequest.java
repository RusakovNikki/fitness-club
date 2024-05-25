package ru.api.fitnessclub.pojo;

import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {

    private String username;
    private String email;
    private Set<String> roles;
    private String password;

}
