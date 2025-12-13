package com.FirstProject.Service;


import com.FirstProject.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.FirstProject.Entity.User;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    public void login(){

    List<User> list =  userRepository.findAll();
        System.out.println(list+"list from database");
    }

    public void register(User user){

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        System.out.println(user+"inside register");
        User user1  = userRepository.save(user);

        System.out.println(user1 + "user saved in DB");

    }
}
