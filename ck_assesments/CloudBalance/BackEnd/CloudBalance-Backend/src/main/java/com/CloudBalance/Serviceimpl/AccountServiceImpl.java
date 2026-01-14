package com.CloudBalance.Serviceimpl;

import com.CloudBalance.DTO.AccountDto;
import com.CloudBalance.Entity.AccountEntity;
import com.CloudBalance.Entity.UserEntity;
import com.CloudBalance.Exception.AccountNotFoundException;
import com.CloudBalance.Exception.UserNotFoundException;
import com.CloudBalance.Repository.AccountRepository;
import com.CloudBalance.Repository.UserRepository;
import com.CloudBalance.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    public AccountServiceImpl(AccountRepository accountRepository,
                              UserRepository userRepository) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }


    @Override
    public List<AccountDto> getAccounts() {

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
                        a.getActive()
                ))
                .collect(Collectors.toList());
        return dtoList;
    }

    public void setActive(Long id) {

        AccountEntity accountEntity = accountRepository.findById(id).orElseThrow(() -> new AccountNotFoundException("Account not found with id: " + id));
            if (accountEntity.getActive() == true) {
            accountEntity.setActive(false);
            } else {
            accountEntity.setActive(true);
            }
        AccountEntity accountEntity1 = accountRepository.save(accountEntity);
    }

    @Override
    public List<String> getAccountIdByEmail(String email) {

        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found with email :" + email));
        Set<AccountEntity> accountEntityList = userEntity.getAccounts();
        List<String> accountId = userEntity.getAccounts()
                .stream()
                .map(AccountEntity::getAccountId)
                .collect(Collectors.toList());
        return accountId;
    }
}
