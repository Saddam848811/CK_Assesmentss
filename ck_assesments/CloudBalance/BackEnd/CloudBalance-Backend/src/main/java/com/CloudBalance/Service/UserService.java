package com.CloudBalance.Service;

import com.CloudBalance.DTO.UserDto;
import com.CloudBalance.Entity.UserEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {


     List<UserDto> getAllUsers(Authentication authentication);
     UserDto addUser(UserDto userDto);
     UserDto getUserById(Long id);
     UserDto editUserById(UserDto userDto);
     UserDto getUserByEmail(String email);
     UserDto setActive(Long id, Boolean status);
}
