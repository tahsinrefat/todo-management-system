package com.example.tms.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Component
public class JwtTokenProvider {

    @Value( "${app.jwt-secret}")
    private String jwtSecret;

    @Value( "${app.jwt-expiration-milliseconds}")
    private String jwtExpirationDate;

    // Generate JWT token
    public String generateToken(Authentication authentication) {
        String username = authentication.getName();

        Date currentDate = new Date();
        long jwtExpirationMillis = Long.parseLong(jwtExpirationDate);

        Instant expirationInstant = Instant.now().plus(jwtExpirationMillis, ChronoUnit.MILLIS);
        return Jwts.builder()
                .subject(username)
                .issuedAt(currentDate)
                .expiration(Date.from(expirationInstant))
                .signWith(getKey())
                .compact();
    }

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    // Get Username from JWT Token
    public String getUsername(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    // Validate JWT Token
    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().verifyWith(getKey()).build().parseSignedClaims(authToken);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
