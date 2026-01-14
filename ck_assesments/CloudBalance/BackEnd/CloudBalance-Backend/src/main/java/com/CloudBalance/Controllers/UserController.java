package com.CloudBalance.Controllers;


import com.CloudBalance.DTO.UserDto;
import com.CloudBalance.Entity.UserEntity;
import com.CloudBalance.Service.UserService;
import com.CloudBalance.Serviceimpl.UserServiceImpl;
import jakarta.validation.constraints.NotNull;import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email ;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
@Validated
//@CrossOrigin(origins = "http://localhost:5173",allowCredentials = "true")
public class UserController {

    @Autowired
    UserService userService;


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addUser")
    public ResponseEntity<UserDto> addUser(@Validated @RequestBody UserDto userDto){

        System.out.println(userDto+"user dto from add user api");

        UserDto userDto1 = userService.addUser(userDto);

        return new ResponseEntity<>(userDto1, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping ("/getUserById")
    public ResponseEntity<UserDto> getUserById(@RequestParam @Positive(message="id must be positive") @NotNull(message = "id must not be empty") Long id){

    UserDto userDto = userService.getUserById(id);


        return new ResponseEntity<>(userDto ,HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/editUserById")
    public ResponseEntity<UserDto> editUserById(@Validated @RequestBody UserDto userDto){

       UserDto userDto1 =  userService.editUserById(userDto);

       return new ResponseEntity<>(userDto1,HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN','READONLY')")
    @GetMapping("/getUsers")
    public ResponseEntity<List<UserDto>> getUsers(Authentication authentication){

        List<UserDto> list = userService.getAllUsers();


        if (authentication.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_READONLY"))) {

            List<UserDto> activeUserList = new ArrayList<UserDto>();

            for(UserDto userDto : list)
            {
                if (userDto.isActive() == true){
                    activeUserList.add(userDto);
                }
            }
//            list = activeUserList;
            return new ResponseEntity<List<UserDto>>(activeUserList,HttpStatus.OK);

        }

        return new ResponseEntity<List<UserDto>>(list,HttpStatus.OK);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/getUserByEmail")
    public ResponseEntity<UserDto> getUserByEmail(@RequestParam @Email(message = "Email should be valid") @NotBlank(message = "Email cannot be empty") String email){

        UserDto userDto = userService.getUserByEmail(email);

        return new ResponseEntity<>(userDto,HttpStatus.OK);

    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/setActive")
    public void setActive(@RequestParam @Positive(message="id must be positive") @NotNull(message = "id must not be empty") Long id){

        userService.setActive(id);

    }
}
