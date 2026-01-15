package com.CloudBalance.Serviceimpl;

import com.CloudBalance.DTO.AccountDto;
import com.CloudBalance.DTO.UserDto;
import com.CloudBalance.Entity.AccountEntity;
import com.CloudBalance.Entity.UserEntity;
import com.CloudBalance.Exception.UserNotFoundException;
import com.CloudBalance.Mapper.AccountMapper;
import com.CloudBalance.Mapper.UserMapper;
import com.CloudBalance.Repository.AccountRepository;
import com.CloudBalance.Repository.UserRepository;
import com.CloudBalance.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    private UserDto userDto;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final AccountRepository accountRepository;

    public UserServiceImpl(UserRepository userRepository,
                           UserDto userDto,
                           PasswordEncoder passwordEncoder,
                           UserMapper userMapper,
                           AccountRepository accountRepository) {
        this.userRepository = userRepository;
        this.userDto = userDto;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
        this.accountRepository = accountRepository;
    }


    @Override
    public UserDto addUser(UserDto userDto) {

        if (userDto.getId() != null) {
            throw new IllegalStateException("ID must not be provided when creating a new user");
        }
        UserEntity userEntity = userMapper.dtoToEntity(userDto);
        userEntity.setPassword(passwordEncoder.encode(userDto.getPassword()));
        Set<AccountEntity> accountEntitySet = new HashSet<>();

        if (userEntity.getRole().equals("ADMIN") || userEntity.getRole().equals("READONLY")) {
            if (userDto.getAccountList() != null && !userDto.getAccountList().isEmpty()) {
                throw new IllegalStateException("Accounts must not be assigned for Admin/ReadOnly");
            }
            accountEntitySet.addAll(accountRepository.findAll());
        }
        if (userEntity.getRole().equals("CUSTOMER")) {
            if (userDto.getAccountList() == null || userDto.getAccountList().isEmpty()) {
                throw new IllegalStateException("Accounts must be assigned for Customer Role");
            }
            for (AccountDto accountDto : userDto.getAccountList()) {
                AccountEntity accountEntity = accountRepository
                        .findById(accountDto.getId())
                        .orElseThrow(() ->
                                new IllegalStateException("Account not found with id " + accountDto.getId())
                        );
                accountEntitySet.add(accountEntity);
            }
        }

        userEntity.setAccounts(accountEntitySet);
        UserEntity savedUser = userRepository.save(userEntity);

        savedUser.setId(null);
        savedUser.setPassword(null);
        savedUser.setAccounts(null);
        return userMapper.entityToDto(savedUser);
    }


    @Override
    public UserDto getUserById(Long id) {
        UserEntity userEntity = userRepository.findById(id).orElseThrow(() -> new IllegalStateException("User not found with id: " + id));
        userEntity.setPassword(null);
        userDto = userMapper.entityToDto(userEntity);
        return userDto;
    }

    @Override
    public UserDto editUserById(UserDto userDto) {


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUsername = authentication.getName();


        UserEntity userEntity = userRepository.findById(userDto.getId())
                .orElseThrow(() ->
                        new UserNotFoundException("User not found with id: " + userDto.getId())
                );

        if (userEntity.getEmail().equals(loggedInUsername)) {
            throw new IllegalStateException("You cannot edit your own account");
        }

        userEntity.setUsername(userDto.getUsername());
        userEntity.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userEntity.setEmail(userDto.getEmail());
        userEntity.setRole(userDto.getRole());
        userEntity.setActive(userDto.getActive());

        userEntity.getAccounts().clear();

        if (userEntity.getRole().equals("ADMIN") || userEntity.getRole().equals("READONLY")) {
            if (userDto.getAccountList() != null && !userDto.getAccountList().isEmpty()) {
                throw new IllegalStateException("Accounts must not be assigned for Admin/ReadOnly");
            }
            List<AccountEntity> allAccounts = accountRepository.findAll();
            userEntity.getAccounts().addAll(allAccounts);
        }
        if (userDto.getRole().equals("CUSTOMER")) {
            if (userDto.getAccountList() != null) {
                for (AccountDto accountDto : userDto.getAccountList()) {
                    AccountEntity accountEntity = accountRepository
                            .findById(accountDto.getId())
                            .orElseThrow(() ->
                                    new IllegalStateException("Account not found with id " + accountDto.getId())
                            );
                    userEntity.getAccounts().add(accountEntity);
                }
            }
        }

        UserEntity updatedUser = userRepository.save(userEntity);
        updatedUser.setPassword(null);
        return userMapper.entityToDto(updatedUser);
    }


    @Override
    public List<UserDto> getAllUsers(Authentication authentication) {

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
                entity.isActive(),
                null
        )).collect(Collectors.toList());

        if (authentication.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_READONLY"))) {
            List<UserDto> activeUserList = new ArrayList<UserDto>();
            for (UserDto userDto : list) {
                if (userDto.getActive() == true) {
                    activeUserList.add(userDto);
                }
            }
            return activeUserList;
        }
        return list;
    }

    @Override
    public UserDto getUserByEmail(String email) {
        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        userEntity.setPassword(null);
        return userMapper.entityToDto(userEntity);
    }

    public UserDto setActive(Long id, Boolean status) {
        UserEntity userEntity = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        userEntity.setActive(status);
        UserEntity savedUser = userRepository.save(userEntity);
        return userMapper.entityToDto(savedUser);
    }

}
