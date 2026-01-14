package com.CloudBalance.Serviceimpl;

import com.CloudBalance.DTO.AccountDto;
import com.CloudBalance.Entity.AccountEntity;
import com.CloudBalance.Entity.UserEntity;
import com.CloudBalance.Exception.UserNotFoundException;
import com.CloudBalance.Mapper.AccountMapper;
import com.CloudBalance.Repository.AccountRepository;
import com.CloudBalance.Repository.UserRepository;
import com.CloudBalance.Service.UserAccountService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserAccountServiceImpl implements UserAccountService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    AccountMapper accountMapper;



    @Override
    public List<AccountDto> getAccountsByUserId(Long id) {

        UserEntity userEntity = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));


        Set<AccountEntity> accountSet =   userEntity.getAccounts();
        List<AccountDto> accountDtoList = accountSet.stream()
                .map(a -> new AccountDto(
                        a.getId(),
                        a.getAccountName(),
                        a.getAccountId(),
                        a.getResourceName(),
                        a.getServiceType(),
                        a.getPlatform(),
                        a.getInstanceType(),
                        a.getActive()
                ))
                .collect(Collectors.toList());
        return  accountDtoList;

    }

    @Transactional
    @Override
    public boolean assignAccountToUser(Long userId, Long accountId) {


        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        AccountEntity account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found with id:" + accountId));

      boolean flag =   user.getAccounts().add(account);

        userRepository.save(user);
return flag;
    }

    @Override
    public List<AccountDto> accountsNotinUser(Long id) {


        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id:" + id));

        Set<AccountEntity> userAccounts = user.getAccounts();

        List<AccountEntity> allAccounts = accountRepository.findAll();

        List<AccountDto> accountDtoList = allAccounts.stream()
                .filter(acc -> !userAccounts.contains(acc))
                .map(a -> new AccountDto(
                        a.getId(),
                        a.getAccountName(),
                        a.getAccountId(),
                        a.getResourceName(),
                        a.getServiceType(),
                        a.getPlatform(),
                        a.getInstanceType(),
                        a.getActive()
                ))
                .collect(Collectors.toList());

return accountDtoList;
    }

    @Override
    public boolean removeAccountFromUser(Long userId, Long accountId) {

        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found woith id : "+ userId));

        AccountEntity accountEntity = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found with id : " + accountId));

        Set<AccountEntity> accountEntitySet = userEntity.getAccounts();
        boolean deleted = accountEntitySet.remove(accountEntity);
        userRepository.save(userEntity);
        return deleted;

    }

    @Override
    public List<AccountDto>  getAllAccounts() {

       List<AccountEntity> accountEntityList =  accountRepository.findAll();

        List<AccountDto> accountDtoList = accountEntityList.stream()
                .map(entity -> new AccountDto(
                        entity.getId(),
                        entity.getAccountName(),
                        entity.getAccountId(),
                        entity.getResourceName(),
                        entity.getServiceType(),
                        entity.getPlatform(),
                        entity.getInstanceType(),
                        entity.getActive()
                ))
                .collect(Collectors.toList());
       return accountDtoList;
    }
}
