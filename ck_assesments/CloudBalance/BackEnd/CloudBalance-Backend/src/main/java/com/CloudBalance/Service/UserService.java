package com.CloudBalance.Service;

import com.CloudBalance.DTO.UserDto;
import com.CloudBalance.Entity.UserEntity;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {


    public List<UserDto> getAllUsers();
    public UserDto addUser(UserDto userDto);
    public UserDto getUserById(Long id);
    public UserDto editUserById(UserDto userDto);
    public UserDto getUserByEmail(String email);
    public UserDto setActive(Long id);
}
