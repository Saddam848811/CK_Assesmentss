package com.CloudBalance.Controllers;

import com.CloudBalance.DTO.LoginDto;
import com.CloudBalance.Serviceimpl.CustomUserDetailsService;
import com.CloudBalance.Utils.JwtUtils;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
//@CrossOrigin(origins = "http://localhost:5173",allowCredentials = "true")
public class AuthController {

    @Autowired
    CustomUserDetailsService customUserDetailsService;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/authCheck")
    public ResponseEntity<?> me(Authentication authentication) {

        System.out.println(authentication + "from auth chceck auth controller");
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(authentication);
    }


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto){

        System.out.println(loginDto+"logindto form auth login");

            UserDetails userDetails = customUserDetailsService.loadUserByUsername(loginDto.getEmail());

            System.out.println(userDetails+"userdato;s from login");

            String token = jwtUtils.generateToken(userDetails.getUsername());

            System.out.println(token+"jwt token from login");

        ResponseCookie cookie = ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(24 * 60 * 60)
                .sameSite("Lax")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Login success");






    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {

        ResponseCookie cookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Logout successful");
    }

}
