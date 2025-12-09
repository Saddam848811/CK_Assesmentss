package com.CloudBalance.Controllers;


import com.CloudBalance.DTO.UserDto;
import com.CloudBalance.Service.UserService;
import com.CloudBalance.Serviceimpl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/addUser")
    public ResponseEntity<UserDto> addUser(@RequestBody UserDto userDto){
        UserDto userDto1 = userService.addUser(userDto);

        return new ResponseEntity<>(userDto1, HttpStatus.CREATED);
    }

    @PostMapping ("/getUserById")
    public ResponseEntity<UserDto> getUserById(@RequestParam Long id){

    UserDto userDto = userService.getUserById(id);

        return new ResponseEntity<>(userDto ,HttpStatus.OK);
    }

    @PostMapping("/editUserById")
    public ResponseEntity<UserDto> editUserById(@RequestBody UserDto userDto){

       UserDto userDto1 =  userService.editUserById(userDto);
        System.out.println(userDto1+"userdto 1");

       return new ResponseEntity<>(userDto1,HttpStatus.OK);
    }

    @GetMapping("/getUsers")
    public ResponseEntity<List<UserDto>> getUsers(){

        List<UserDto> list = userService.getAllUsers();

        return new ResponseEntity<List<UserDto>>(list,HttpStatus.OK);
    }
}
