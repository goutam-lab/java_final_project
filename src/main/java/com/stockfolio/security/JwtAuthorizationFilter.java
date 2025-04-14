package com.stockfolio.security;

import java.io.IOException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private final UserDetailsService userDetailsService;
    private final String jwtSecret;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, String jwtSecret) {
        super(authenticationManager);
        this.userDetailsService = userDetailsService;
        this.jwtSecret = jwtSecret;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                   FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader("Authorization");

        // Skip authentication for stock endpoints
        if (request.getRequestURI().startsWith("/api/stocks/")) {
            chain.doFilter(request, response);
            return;
        }
        
        if (header == null || !header.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        UsernamePasswordAuthenticationToken authentication = getAuthentication(request);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null) {
            try {
                byte[] signingKey = jwtSecret.getBytes();

                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(Keys.hmacShaKeyFor(signingKey))
                        .build()
                        .parseClaimsJws(token.replace("Bearer ", ""))
                        .getBody();

                String username = claims.getSubject();

                if (username != null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                }
            } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException | IllegalArgumentException e) {
                logger.error("JWT token validation error", e);
            }
        }
        return null;
    }
}
