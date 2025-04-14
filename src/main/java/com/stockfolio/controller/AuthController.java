package com.stockfolio.controller;

import com.stockfolio.model.User;
import com.stockfolio.service.PortfolioService;
import com.stockfolio.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final PortfolioService portfolioService;

    public AuthController(UserService userService, PortfolioService portfolioService) {
        this.userService = userService;
        this.portfolioService = portfolioService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            User user = userService.registerUser(
                    registerRequest.getName(),
                    registerRequest.getEmail(),
                    registerRequest.getPassword()
            );
            
            // Create a default portfolio for the user
            portfolioService.createPortfolio(user.getId(), "Default Portfolio");
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully");
            response.put("userId", user.getId());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Login is handled by JwtAuthenticationFilter

    public static class RegisterRequest {
        private String name;
        private String email;
        private String password;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
