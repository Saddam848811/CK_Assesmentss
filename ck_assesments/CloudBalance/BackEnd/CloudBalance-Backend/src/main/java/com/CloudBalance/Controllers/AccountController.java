package com.CloudBalance.Controllers;

import com.CloudBalance.DTO.AccountDto;
import com.CloudBalance.DTO.UserDto;
import com.CloudBalance.Entity.AccountEntity;
import com.CloudBalance.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.NotNull;


import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/account")
@Validated
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','READONLY')")
    @GetMapping("/getAccounts")
    public ResponseEntity<List<AccountDto>> getAccounts(Authentication authentication){
        System.out.println( "hii from get accounts method");

        List<AccountDto>  list = accountService.getAccounts();
        List<AccountDto> activeAccountList = new ArrayList<AccountDto>();

       for(AccountDto accountDto : list)
        {
            if (accountDto.getActive() == true){
               activeAccountList.add(accountDto);
            }
        }

        if (authentication.getAuthorities().stream()
               .anyMatch(auth -> auth.getAuthority().equals("ROLE_READONLY"))) {

           list = activeAccountList;
        }


        return new ResponseEntity<List<AccountDto>>(list, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/setActive")
    public void setActive(@RequestParam @Positive(message="id must be positive") @NotNull(message = "id must not be empty") Long id){
        accountService.setActive(id);
    }

    @GetMapping("/getAccountIdByEmail")
    public ResponseEntity<List<String>> getAccountIdByEmail(@RequestParam  String email){

        List<String> list =  accountService.getAccountIdByEmail(email);

        return new ResponseEntity<>(list,HttpStatus.OK);
    }
}
