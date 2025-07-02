package com.smartq.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}") // e.g., 86400000 = 1 day
    private long expiration;

    // ✅ Generate JWT token with email + role claims
    public String generateToken(String email, String role) {
        if (secret == null || secret.isEmpty()) {
            throw new IllegalStateException("JWT secret is not configured");
        }

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS256, secret.getBytes())
                .compact();
    }

    // ✅ Extract email (subject)
    public String extractEmail(String token) {
        return getClaims(token).getSubject();
    }

    // ✅ Extract role from "role" claim
    public String extractRole(String token) {
        return getClaims(token).get("role", String.class);
    }

    // ✅ Validate token: checks expiration and signature
    public boolean validateToken(String token) {
        try {
            getClaims(token); // This throws if invalid or expired
            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("❌ JWT expired: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("❌ JWT unsupported: " + e.getMessage());
        } catch (MalformedJwtException e) {
            System.out.println("❌ JWT malformed: " + e.getMessage());
        } catch (SignatureException e) {
            System.out.println("❌ JWT signature error: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("❌ JWT illegal argument: " + e.getMessage());
        }
        return false;
    }

    // ✅ Internal method to parse JWT and get all claims
    private Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secret.getBytes())
                .parseClaimsJws(token)
                .getBody();
    }
}
