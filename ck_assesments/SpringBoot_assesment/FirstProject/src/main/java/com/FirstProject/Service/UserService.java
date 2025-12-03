package com.FirstProject.Service;


import com.FirstProject.Repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

@Service
public class UserService {


    public void login(){

        System.out.println("this login method from service");

    }
}
