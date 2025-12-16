package com.eduprajna.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.eduprajna.entity.User;
import com.eduprajna.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) { this.userRepository = userRepository; }

    public Optional<User> findByEmail(String email) { return userRepository.findByEmail(email); }
    public User save(User user) { return userRepository.save(user); }
    public long count() { return userRepository.count(); }
    
    /**
     * Create a user if they don't exist, or return existing user
     */
    public User createUserIfNotExists(String email) {
        return findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(email);
            // Set default values for required fields
            if (email.contains("@")) {
                String username = email.substring(0, email.indexOf("@"));
                newUser.setName(username);
            } else {
                newUser.setName(email);
            }
            // Set a default password (should be changed on first login in production)
            newUser.setPasswordHash("temporary");
            return userRepository.save(newUser);
        });
    }
}