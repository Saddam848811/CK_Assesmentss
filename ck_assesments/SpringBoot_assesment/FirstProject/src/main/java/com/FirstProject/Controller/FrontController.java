package com.FirstProject.Controller;


import com.FirstProject.Repository.UserRepository;
import com.FirstProject.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

@Controller
public class FrontController {


    private UserService us;



    @Autowired
    public FrontController(UserService us){
        this.us = us;
    }



    public void Start(){
        System.out.println("front controller");
        us.login();

    }


}
