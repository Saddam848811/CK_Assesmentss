package com.CloudBalance.Controllers;

import com.CloudBalance.DTO.LoginDto;
import com.CloudBalance.Entity.UserEntity;
import com.CloudBalance.Exception.InvalidToken;
import com.CloudBalance.Exception.JwtAuthenticationException;
import com.CloudBalance.Exception.NulltokenException;
import com.CloudBalance.Exception.UserNotFoundException;
import com.CloudBalance.Repository.UserRepository;
import com.CloudBalance.Serviceimpl.CustomUserDetailsService;
import com.CloudBalance.Utils.JwtUtils;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private  UserRepository userRepository;

    public AuthController(CustomUserDetailsService customUserDetailsService,
                          JwtUtils jwtUtils,
                          PasswordEncoder passwordEncoder,
                          UserRepository userRepository) {
        this.customUserDetailsService = customUserDetailsService;
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @GetMapping("/authCheck")
    public ResponseEntity<?> authCheck(Authentication authentication) {

        if (authentication == null) {
            throw new IllegalStateException("User not Authenticated");
        }
        Map<String, Object> response = new HashMap<>();
        response.put("username", authentication.getName());
        response.put("authorities", authentication.getAuthorities());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginDto loginDto) {

       UserEntity userEntity =  userRepository.findByEmail(loginDto.getEmail()).orElseThrow(()-> new IllegalStateException("user not found"));

       if(!userEntity.isActive()){
           throw new IllegalArgumentException("user is ont active");
       }
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(loginDto.getEmail());


        boolean match = passwordEncoder.matches(loginDto.getPassword(), userDetails.getPassword());

        if (!match) {
            throw new UserNotFoundException("Password not Matched :" + loginDto.getPassword());
        }

        if (match) {

            String token = jwtUtils.generateToken(userDetails.getUsername());
            String refreshtoken = jwtUtils.generateRefreshToken(userDetails.getUsername());

            ResponseCookie cookie = ResponseCookie.from("token", token)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(15 * 60)
                    .sameSite("Lax")
                    .build();

            ResponseCookie RCookie = ResponseCookie.from("refreshToken", refreshtoken)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(30 * 60)
                    .sameSite("Lax")
                    .build();

            return ResponseEntity.status(HttpStatus.OK)
                    .header(HttpHeaders.SET_COOKIE, cookie.toString(), RCookie.toString())
                    .body("Login success");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid credentials");
    }


    @PostMapping("/refreshToken")
    public ResponseEntity<String> refreshToken(@CookieValue(name = "refreshToken", required = false) String refreshToken) {

        if (refreshToken == null) {
            throw new NulltokenException("refresh token not found");
        }
        if (!jwtUtils.validateToken(refreshToken)) {
            throw new InvalidToken("Refresh token missing or invalid");
        }


        String username = jwtUtils.extractUsername(refreshToken);

        String token = jwtUtils.generateToken(username);

        ResponseCookie cookie = ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(15 * 60)
                .sameSite("Lax")
                .build();

        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("token refreshed succesfully");

    }
}
