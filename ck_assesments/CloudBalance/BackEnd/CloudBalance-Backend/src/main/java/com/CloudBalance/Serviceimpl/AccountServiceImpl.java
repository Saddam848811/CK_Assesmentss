package com.CloudBalance.Serviceimpl;

import com.CloudBalance.Entity.AccountEntity;
import com.CloudBalance.Repository.AccountRepository;
import com.CloudBalance.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    AccountRepository accountRepository;

    @Override
    public  List<AccountEntity> getAccounts() {


       return accountRepository.findAll();


    }
}
