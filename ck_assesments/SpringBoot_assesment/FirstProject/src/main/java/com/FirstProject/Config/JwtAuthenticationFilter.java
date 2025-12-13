package com.FirstProject.Config;
 import com.FirstProject.Util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
 import org.springframework.security.core.Authentication;
 import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String token = null;
        String username = null;

        System.out.println("=== JWT FILTER START ===");

        // 1️⃣ Check Authorization header
        String header = request.getHeader("Authorization");
        System.out.println("Auth header: " + header);

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
            System.out.println("Token from header: " + token);
        }

        // 2️⃣ If no header, check cookies
//        if (token == null) {
//            Cookie[] cookies = request.getCookies();
//
//            if (cookies != null) {
//                for (Cookie c : cookies) {
//                    System.out.println("Cookie → " + c.getName() + " = " + c.getValue());
//                    if (c.getName().equals("jwt")) {
//                        token = c.getValue();
//                        System.out.println("Token from cookie: " + token);
//                    }
//                }
//            }
//        }
//
//        // 3️⃣ If still no token → skip filter
//        if (token == null) {
//            System.out.println("NO TOKEN FOUND");
//            chain.doFilter(request, response);
//            return;
//        }

        // 4️⃣ extract username
        try {
            username = jwtUtil.extractUsername(token);
            System.out.println("Username from token: " + username);
        } catch (Exception e) {
            System.out.println("INVALID TOKEN");
            chain.doFilter(request, response);
            return;
        }

        // 5️⃣ Set authentication only if user is not already authenticated
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

            if (jwtUtil.validateToken(token)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );
//                Authentication auth = new JwtAuthenticationToken(userDetails, userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authToken);

                System.out.println("AUTHENTICATION SUCCESS FOR USER → " + username);
            }
        }

        System.out.println("=== JWT FILTER END ===");
        chain.doFilter(request, response);
    }
}
