package com.CloudBalance.Service;

import com.CloudBalance.DTO.AccountDto;

import java.util.List;

public interface UserAccountService {


    List<AccountDto> getAccountsByUserId(Long id);
    boolean assignAccountToUser(Long userId,Long accountId);
    List<AccountDto>  accountsNotinUser(Long id);
    boolean removeAccountFromUser(Long userId,Long accountId);
    List<AccountDto> getAllAccounts();
}
