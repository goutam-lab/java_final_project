package com.stockfolio.controller;

import com.stockfolio.model.User;
import com.stockfolio.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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
        
        User updatedUser = userService.updateUser(user);
        
        Map<String, Object> response = new HashMap<>();
        response.put("id", updatedUser.getId());
        response.put("name", updatedUser.getName());
        response.put("email", updatedUser.getEmail());
        
        return ResponseEntity.ok(response);
    }

    public static class UpdateUserRequest {
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
