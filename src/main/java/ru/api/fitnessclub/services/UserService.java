package ru.api.fitnessclub.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import ru.api.fitnessclub.models.UserModel;
import ru.api.fitnessclub.repositories.RoleRepository;
import ru.api.fitnessclub.repositories.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel user = findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found"));

        return new User(
                user.getUsername(),
                user.getPassword(),
                user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName()))
                        .collect(Collectors.toList()));
    }

    public void createNewUser(UserModel user) {
        user.setRoles(List.of(roleRepository.findByName("ROLE_USER").get()));
        userRepository.save(user);
    }

    public Optional<UserModel> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // private UserRepository userRepository;
    // private SubscriptionRepository subscriptionRepository;

    // public List<UserModel> getUsers() {
    // // return userRepository.findAll();
    // return null;
    // }

    // public void createUser(UserModel user) {
    // userRepository.save(user);
    // }

    // public List<UserModel> getUsersByName(String name) {
    // return userRepository.findAllByName(name);
    // }

    // public UserModel updateUserStatus(Long userId, String status) {
    // // UserModel user = userRepository.findById(userId).orElseThrow();

    // // if (status.equalsIgnoreCase("ENTER")) {
    // // user.setEnteredAt(LocalDateTime.now());
    // // user.setLeftAt(null);
    // // } else if (status.equalsIgnoreCase("LEFT")) {
    // // user.setEnteredAt(null);
    // // user.setLeftAt(LocalDateTime.now());
    // // }

    // // user.setStatus(status);
    // // return userRepository.save(user);
    // return null;
    // }

    // public UserModel addSubscriptionToUser(Long userId, Long subId) {
    // // SubscriptionModel subscription =
    // // subscriptionRepository.findById(subId).orElse(null);
    // // UserModel user = userRepository.findById(userId).orElse(null);

    // // if (user != null && subscription != null) {
    // // // inventory.setUser(user);
    // // // return inventoryRepository.save(inventory);
    // // user.setSubscription(subscription);
    // // return userRepository.save(user);
    // // }

    // return null;
    // }
}
