package com.traveloop.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.traveloop.backend.dto.AuthResponse;
import com.traveloop.backend.security.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthMeController {

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/me")
    public AuthResponse me(Authentication authentication, HttpServletRequest request) {
        // With Spring Security JWT filter, authentication principal should already be a
        // UserDetails
        Object principal = authentication.getPrincipal();
        if (!(principal instanceof UserDetails userDetails)) {
            // Fallback: attempt extract from token
            String authHeader = request.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String email = jwtUtil.extractUsername(token);
                // name unknown here; token contains subject only
                return new AuthResponse(token, email, email);
            }
            return new AuthResponse(null, null, null);
        }

        String email = userDetails.getUsername();
        // Name is not part of UserDetails in this project; keep email for both for now.
        // Frontend only needs email/name display.
        return new AuthResponse(null, email, email);
    }
}
