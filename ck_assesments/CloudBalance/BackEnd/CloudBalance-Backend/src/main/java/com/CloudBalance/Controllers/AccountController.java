package com.CloudBalance.Controllers;

import com.CloudBalance.Entity.AccountEntity;
import com.CloudBalance.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    AccountService accountService;


    @PreAuthorize("hasAnyRole('ADMIN','READONLY','CUSTOMER')")
    @GetMapping("/getAccounts")
    public ResponseEntity<List<AccountEntity>> getAccounts(){
        System.out.println( "hii from get accounts method");



        return new ResponseEntity<>(accountService.getAccounts(), HttpStatus.OK);
    }
}
