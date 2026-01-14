package com.CloudBalance.Service;

import com.CloudBalance.DTO.AccountDto;
import com.CloudBalance.Entity.AccountEntity;

import java.util.List;

public interface AccountService {

    List<AccountDto>  getAccounts();
    void setActive(Long id);
    List<String> getAccountIdByEmail(String email);
}
