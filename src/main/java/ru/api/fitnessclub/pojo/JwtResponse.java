package ru.api.fitnessclub.pojo;

import java.util.Set;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import ru.api.fitnessclub.models.RoleModel;

@Getter
@Setter
@RequiredArgsConstructor
public class JwtResponse {
    @NonNull
    private String token;
    private String type = "Bearer";
    private Long id;
    @NonNull
    private String username;
    @NonNull
    private String email;
    @NonNull
    private Set<RoleModel> roles;
}
