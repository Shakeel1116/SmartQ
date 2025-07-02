package com.smartq.dto;

import com.smartq.model.User;

public class AuthResponse {
    private String name;
    private String email;
    private String role;
    private String token;

    // Constructor using User object and token
    public AuthResponse(String token, User user) {
        this.name = user.getUsername();
        this.email = user.getEmail();
        this.role = "user"; // hardcoded since admin is removed
        this.token = token;
    }

    // Getters
    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getToken() {
        return token;
    }
}
