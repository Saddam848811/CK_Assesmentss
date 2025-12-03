package com.CloudBalance.Controllers;


import com.CloudBalance.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;



    @GetMapping("/getUsers")
    public void getUsers(){

        System.out.println("hello from getusers");
        System.out.println(userService+"userservice object");
        userService.getAllUsers();
    }
}
