package com.CloudBalance.Serviceimpl;

import com.CloudBalance.DTO.AccountDto;
import com.CloudBalance.Entity.AccountEntity;
import com.CloudBalance.Entity.UserEntity;
import com.CloudBalance.Repository.AccountRepository;
import com.CloudBalance.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    AccountRepository accountRepository;
    @Autowired
    AccountDto accountDto;

    @Override
    public   List<AccountDto>  getAccounts() {

        List<AccountEntity> list = accountRepository.findAll();

        List<AccountDto> dtoList = list.stream()
                .map(a -> new AccountDto(
                        a.getId(),
                        a.getAccountName(),
                        a.getAccountId(),
                        a.getResourceName(),
                        a.getServiceType(),
                        a.getPlatform(),
                        a.getInstanceType(),
                        a.isActive()
                ))
                .collect(Collectors.toList());

       return dtoList;


    }

    public void setActive(Long id){

        AccountEntity accountEntity = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not found with id: " + id));

        if(accountEntity.isActive() == true){
            accountEntity.setActive(false);
        }else{
            accountEntity.setActive(true);
        }
        AccountEntity accountEntity1 =  accountRepository.save(accountEntity);

    }
}
