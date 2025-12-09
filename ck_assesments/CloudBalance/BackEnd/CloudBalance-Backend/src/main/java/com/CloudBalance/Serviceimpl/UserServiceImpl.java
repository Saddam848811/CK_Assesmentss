package com.CloudBalance.Serviceimpl;

import com.CloudBalance.DTO.UserDto;
import com.CloudBalance.Entity.UserEntity;
import com.CloudBalance.Repository.UserRepository;
import com.CloudBalance.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {


    @Autowired
    UserRepository userRepository;
    @Autowired
    UserDto userDto;

    @Override
    public UserDto addUser(UserDto userDto) {
        System.out.println("user added");

        UserEntity userEntity = new UserEntity();

        userEntity.setFirstName(userDto.getFirstName());
        userEntity.setLastName(userDto.getLastName());
        userEntity.setEmail(userDto.getEmail());
        userEntity.setRole(userDto.getRole());
        userEntity.setLastLogin(userDto.getLastLogin());
        userEntity.setActive(userDto.isActive());

        UserEntity savedUser = userRepository.save(userEntity);


        UserDto savedDto = new UserDto();
        savedDto.setId(savedUser.getId());
        savedDto.setFirstName(savedUser.getFirstName());
        savedDto.setLastName(savedUser.getLastName());
        savedDto.setEmail(savedUser.getEmail());
        savedDto.setRole(savedUser.getRole());
        savedDto.setLastLogin(savedUser.getLastLogin());
        savedDto.setActive(savedUser.isActive());


        return savedDto;

    }

    @Override
    public UserDto getUserById(Long id) {

        UserEntity userEntity = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        userDto.setId(userEntity.getId());
        userDto.setFirstName(userEntity.getFirstName());
        userDto.setLastName(userEntity.getLastName());
        userDto.setEmail(userEntity.getEmail());
        userDto.setRole(userEntity.getRole());
        userDto.setLastLogin(userEntity.getLastLogin());
        userDto.setActive(userEntity.isActive());

        return userDto;


    }

    @Override
    public UserDto editUserById(UserDto userDto) {

        UserEntity userEntity = userRepository.findById(userDto.getId()).orElseThrow(() -> new RuntimeException("User not found with id: " + userDto.getId()));

        userEntity.setFirstName(userDto.getFirstName());
        userEntity.setLastName(userDto.getLastName());
        userEntity.setEmail(userDto.getEmail());
        userEntity.setRole(userDto.getRole());
        userEntity.setLastLogin(userDto.getLastLogin());
        userEntity.setActive(userDto.isActive());

        UserEntity updatedUser   = userRepository.save(userEntity);

        UserDto updatedDto = new UserDto();
        updatedDto.setId(updatedUser.getId());
        updatedDto.setFirstName(updatedUser.getFirstName());
        updatedDto.setLastName(updatedUser.getLastName());
        updatedDto.setEmail(updatedUser.getEmail());
        updatedDto.setRole(updatedUser.getRole());
        updatedDto.setLastLogin(updatedUser.getLastLogin());
        updatedDto.setActive(updatedUser.isActive());

        return updatedDto;
    }

    @Override
    public List<UserDto> getAllUsers() {
        System.out.println("hello from user impl");

        List<UserEntity> entities = userRepository.findAll();

        List<UserDto> list = entities.stream().map(entity -> new UserDto(
                        entity.getId(),
                        entity.getFirstName(),
                        entity.getLastName(),
                        entity.getEmail(),
                        entity.getRole(),
                        entity.getLastLogin(),
                        entity.isActive()
                )).collect(Collectors.toList());

        return list;
    }



}
