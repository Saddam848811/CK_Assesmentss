package com.CloudBalance.Serviceimpl;

import com.CloudBalance.DTO.UserDto;
import com.CloudBalance.Entity.UserEntity;
import com.CloudBalance.Exception.UserNotFoundException;
import com.CloudBalance.Mapper.UserMapper;
import com.CloudBalance.Repository.UserRepository;
import com.CloudBalance.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserMapper userMapper;

    @Override
    public UserDto addUser(UserDto userDto) {

        UserEntity userEntity = userMapper.dtoToEntity(userDto);
        userEntity.setPassword(passwordEncoder.encode(userDto.getPassword()));

        UserEntity savedUser = userRepository.save(userEntity);

        if (savedUser == null) {
            throw new IllegalStateException("User could not be saved!");
        }

        UserDto savedDto = userMapper.entityToDto(savedUser);
        return savedDto;

    }

    @Override
    public UserDto getUserById(Long id) {

        UserEntity userEntity = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        userEntity.setPassword(null);

         userDto = userMapper.entityToDto(userEntity);

        return userDto;
    }

    @Override
    public UserDto editUserById(UserDto userDto) {

        UserEntity userEntity = userRepository.findById(userDto.getId()).orElseThrow(() -> new UserNotFoundException("User not found with id: " + userDto.getId()));


        userEntity.setUsername(userDto.getUsername());
        userEntity.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userEntity.setEmail(userDto.getEmail());
        userEntity.setRole(userDto.getRole());
        userEntity.setActive(userDto.isActive());

        UserEntity updatedUser   = userRepository.save(userEntity);
        updatedUser.setPassword(null);

        if (updatedUser == null) {
            throw new IllegalStateException("user is not being updated");
        }


        UserDto updatedDto = userMapper.entityToDto(updatedUser);

        return updatedDto;
    }

    @Override
    public List<UserDto> getAllUsers() {

        List<UserEntity> entities = userRepository.findAll();

        if (entities.isEmpty()) {
            throw new UserNotFoundException("No users found in the database");
        }

        List<UserDto> list = entities.stream().map(entity -> new UserDto(
                        entity.getId(),
                        entity.getUsername(),
                        entity.getEmail(),
                        null,
                        entity.getRole(),
                        entity.isActive()
                )).collect(Collectors.toList());

        return list;
    }

    @Override
    public UserDto getUserByEmail(String email) {

        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        userEntity.setPassword(null);

        return userMapper.entityToDto(userEntity);


    }

    public UserDto setActive(Long id){

        UserEntity userEntity = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));

        if(userEntity.isActive() == true){
            userEntity.setActive(false);
        }
        else{
            userEntity.setActive(true);
        }
        UserEntity userEntity1 =  userRepository.save(userEntity);
        if (userEntity1 == null) {
            throw new IllegalStateException("user not saved to DB");
        }


        UserDto userDto1 =  userMapper.entityToDto(userEntity1);

        return userDto1;
    }

}
