package com.stockfolio.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stockfolio.model.User;
import com.stockfolio.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        
        return ResponseEntity.ok(response);
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateCurrentUser(
            Authentication authentication,
            @RequestBody UpdateUserRequest request) {
        User user = (User) authentication.getPrincipal();
        
        if (request.getName() != null && !request.getName().isEmpty()) {
            user.setName(request.getName());
        }
        
        if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            user.setEmail(request.getEmail()); // Update email if provided
        }
        
        User updatedUser = userService.updateUser(user);
        
        Map<String, Object> response = new HashMap<>();
        response.put("id", updatedUser.getId());
        response.put("name", updatedUser.getName());
        response.put("email", updatedUser.getEmail());
        
        return ResponseEntity.ok(response);
    }

    public static class UpdateUserRequest {
        private String name;
        private String email; // Add email field

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email; // Getter for email
        }

        public void setEmail(String email) {
            this.email = email; // Setter for email
        }
    }
}
