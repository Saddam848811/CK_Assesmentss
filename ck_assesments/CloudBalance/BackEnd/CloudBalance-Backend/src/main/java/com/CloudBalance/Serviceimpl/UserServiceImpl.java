package com.CloudBalance.Serviceimpl;

import com.CloudBalance.Service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {


    @Override
    public void getAllUsers() {
        System.out.println("hello from user impl");
    }
}
