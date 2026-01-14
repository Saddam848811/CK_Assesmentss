package com.CloudBalance.Service;

import com.CloudBalance.DTO.AccountDto;
import com.CloudBalance.Entity.AccountEntity;

import java.util.List;

public interface AccountService {

    public  List<AccountDto>  getAccounts();
    public void setActive(Long id);

}
