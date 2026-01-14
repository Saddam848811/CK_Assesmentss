package com.FirstProject.Controller;


import com.FirstProject.Entity.User;
import com.FirstProject.Repository.UserRepository;
import com.FirstProject.Service.UserService;
import com.FirstProject.Util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/test")
public class FrontController {


    @Autowired
    private UserService us;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    UserRepository userRepository;



    @Transactional
    @PostMapping("/hello")
    public String hello(@RequestBody User user) {
       User user1 =  userRepository.save(user);
        System.out.println(user1.getId());
        user1.setUserName("saddam");
        int x = 10/0;
        userRepository.save(user1);
        return "hello you are authenticated";
    }




    @PostMapping ("/users")
    public String Start(@RequestBody User user , HttpServletRequest request, HttpServletResponse response) {
        System.out.println(user + "front controller");


        String token = null;

//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        user.getUserName(),
//                        user.getPassword()
//                )
//        );

        Authentication authtoken   = new UsernamePasswordAuthenticationToken(user.getUserName(),user.getPassword());

        Authentication authentication = authenticationManager.authenticate(authtoken);

        System.out.println(authtoken+"from /users");
        System.out.println(authentication+"from /users");

        if (authentication.isAuthenticated()){
             token = jwtUtil.generateToken(user.getUserName());

        }
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);



//        Cookie cookie = new Cookie("jwt", token);
//        cookie.setHttpOnly(true);
//        cookie.setSecure(false);   // change to true in production (HTTPS)
//        cookie.setPath("/");       // available to entire app
//        cookie.setMaxAge(60 * 60); // 1 hour
//
//        response.addCookie(cookie);

        return token;
    }



}
