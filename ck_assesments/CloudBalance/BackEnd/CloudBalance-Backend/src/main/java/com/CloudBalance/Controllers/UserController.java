package com.CloudBalance.Controllers;


import com.CloudBalance.DTO.UserDto;
import com.CloudBalance.Entity.UserEntity;
import com.CloudBalance.Service.UserService;
import com.CloudBalance.Serviceimpl.UserServiceImpl;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
//@CrossOrigin(origins = "http://localhost:5173",allowCredentials = "true")
public class UserController {

    @Autowired
    UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addUser")
    public ResponseEntity<UserDto> addUser(@RequestBody UserDto userDto){

        System.out.println(userDto+"user dto from add user api");

        UserDto userDto1 = userService.addUser(userDto);

        return new ResponseEntity<>(userDto1, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping ("/getUserById")
    public ResponseEntity<UserDto> getUserById(@RequestParam Long id){

    UserDto userDto = userService.getUserById(id);


        return new ResponseEntity<>(userDto ,HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/editUserById")
    public ResponseEntity<UserDto> editUserById(@RequestBody UserDto userDto){

       UserDto userDto1 =  userService.editUserById(userDto);
        System.out.println(userDto1+"userdto 1");

       return new ResponseEntity<>(userDto1,HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN','READONLY')")
    @GetMapping("/getUsers")
    public ResponseEntity<List<UserDto>> getUsers(){

        List<UserDto> list = userService.getAllUsers();
        System.out.println(list+"get user by id api");


        return new ResponseEntity<List<UserDto>>(list,HttpStatus.OK);
    }


    @PostMapping("/getUserByEmail")
    public ResponseEntity<UserDto> getUserByEmail(@RequestParam String email){

        System.out.println(email+"from get user by email");

        UserDto userDto = userService.getUserByEmail(email);



        return new ResponseEntity<>(userDto,HttpStatus.OK);

    }
}
