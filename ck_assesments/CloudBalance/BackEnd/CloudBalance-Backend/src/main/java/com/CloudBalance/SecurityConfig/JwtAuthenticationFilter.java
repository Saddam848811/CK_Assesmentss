package com.CloudBalance.SecurityConfig;

import com.CloudBalance.Utils.JwtUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsService customUserDetailsService;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String token = null;
        String username = null;

        System.out.println("=== JWT FILTER START ===");

        System.out.println(request+"request jwt filter");
/// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        String cookietoken = null;
        String cookieusername = null;



        Cookie[] cookies = request.getCookies();
        System.out.println("Auth Cookies: " + cookies);
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("token")) {
                    cookietoken = cookie.getValue();
                    break;
                }
            }
        }
        System.out.println("Auth cookietoken: " + cookietoken);

        try {
            cookieusername = jwtUtils.extractUsername(cookietoken);
            System.out.println("Username from token: " + cookieusername);
        } catch (Exception e) {
            System.out.println("INVALID TOKEN");
            chain.doFilter(request, response);
            return;
        }

        if (cookieusername != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = customUserDetailsService.loadUserByUsername(cookieusername);

            if (jwtUtils.validateToken(cookietoken)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                System.out.println(authToken+"auth token after jwt validation");
                SecurityContextHolder.getContext().setAuthentication(authToken);

                System.out.println("AUTHENTICATION SUCCESS FOR USER → " + cookieusername);
            }
        }



/// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        String header = request.getHeader("Authorization");
        System.out.println("Auth header: " + header);


        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
            System.out.println("Token from header: " + token);
        }

        try {
            username = jwtUtils.extractUsername(token);
            System.out.println("Username from token: " + username);
        } catch (Exception e) {
            System.out.println("INVALID TOKEN");
            chain.doFilter(request, response);
            return;
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

            if (jwtUtils.validateToken(token)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                SecurityContextHolder.getContext().setAuthentication(authToken);

                System.out.println("AUTHENTICATION SUCCESS FOR USER → " + username);
            }
        }

        System.out.println("=== JWT FILTER END ===");
        chain.doFilter(request, response);

    }
}
