package com.FirstProject;

import com.FirstProject.Controller.FrontController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
//@Configuration
//@EnableAutoConfiguration
//@ComponentScan
public class FirstProjectApplication {

	public static void main(String[] args) {

        SpringApplication.run(FirstProjectApplication.class, args);
//        ApplicationContext context = SpringApplication.run(FirstProjectApplication.class, args);
//
//
//                String[] beanNames = context.getBeanDefinitionNames();
//        for(String name : beanNames) {
//            System.out.println(name);
//        }
//
//        FrontController fc = context.getBean(FrontController.class); // <-- ye sahi hai
////        System.out.println(fc.Start());
//        fc.Start();

    }

}
