package com.CloudBalance.Serviceimpl;

import com.CloudBalance.DTO.UserDto;
import com.CloudBalance.Entity.UserEntity;
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
        System.out.println(userDto+"from add user method");

        UserEntity userEntity = userMapper.dtoToEntity(userDto);
        userEntity.setPassword(passwordEncoder.encode(userDto.getPassword()));

//        userEntity.setUsername(userDto.getUsername());
//        userEntity.setPassword(passwordEncoder.encode(userDto.getPassword()));
//        userEntity.setEmail(userDto.getEmail());
//        userEntity.setRole(userDto.getRole());
//        userEntity.setActive(userDto.isActive());

        System.out.println(userEntity+"from add user method");


        UserEntity savedUser = userRepository.save(userEntity);



        UserDto savedDto = userMapper.entityToDto(savedUser);



//        savedDto.setId(savedUser.getId());
//        savedDto.setUsername(savedUser.getUsername());
//        savedDto.setPassword(savedUser.getPassword());
//        savedDto.setEmail(savedUser.getEmail());
//        savedDto.setRole(savedUser.getRole());
//        savedDto.setActive(savedUser.isActive());


        return savedDto;

    }

    @Override
    public UserDto getUserById(Long id) {

        UserEntity userEntity = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));

         userDto = userMapper.entityToDto(userEntity);

//        userDto.setId(userEntity.getId());
//        userDto.setUsername(userEntity.getUsername());
//        userDto.setPassword(userEntity.getPassword());
//        userDto.setEmail(userEntity.getEmail());
//        userDto.setRole(userEntity.getRole());
//        userDto.setActive(userEntity.isActive());

        return userDto;


    }

    @Override
    public UserDto editUserById(UserDto userDto) {

        UserEntity userEntity = userRepository.findById(userDto.getId()).orElseThrow(() -> new RuntimeException("User not found with id: " + userDto.getId()));


        userEntity.setUsername(userDto.getUsername());
        userEntity.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userEntity.setEmail(userDto.getEmail());
        userEntity.setRole(userDto.getRole());
        userEntity.setActive(userDto.isActive());

        UserEntity updatedUser   = userRepository.save(userEntity);


        UserDto updatedDto = userMapper.entityToDto(updatedUser);



//        updatedDto.setId(updatedUser.getId());
//        updatedDto.setUsername(updatedUser.getUsername());
//        updatedDto.setPassword(updatedUser.getPassword());
//        updatedDto.setEmail(updatedUser.getEmail());
//        updatedDto.setRole(updatedUser.getRole());
//        updatedDto.setActive(updatedUser.isActive());

        return updatedDto;
    }

    @Override
    public List<UserDto> getAllUsers() {
        System.out.println("hello from user impl");

        List<UserEntity> entities = userRepository.findAll();

        System.out.println(entities+"hello from user impl");


        List<UserDto> list = entities.stream().map(entity -> new UserDto(
                        entity.getId(),
                        entity.getUsername(),
                        entity.getEmail(),
                        entity.getPassword(),
                        entity.getRole(),
                        entity.isActive()
                )).collect(Collectors.toList());

        return list;
    }

    @Override
    public UserDto getUserByEmail(String email) {

        UserEntity userEntity = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + email));

        return userMapper.entityToDto(userEntity);


    }

}
