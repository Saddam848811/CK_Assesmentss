package com.CloudBalance.Controllers;


import com.CloudBalance.DTO.AccountDto;
import com.CloudBalance.Service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;


import java.util.List;

@RestController
@RequestMapping("/user_account")
@Validated
public class UserAccountController {


    private final UserAccountService userAccountService;

    public UserAccountController(UserAccountService userAccountService) {
        this.userAccountService = userAccountService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','READONLY')")
    @PostMapping("/getAllAccounts")
    public List<AccountDto> getAllAccounts() {
        return userAccountService.getAllAccounts();
    }

    @PreAuthorize("hasAnyRole('ADMIN','READONLY')")
    @PostMapping("/getAccountsByUserId")
    public ResponseEntity<List<AccountDto>> getAccountsByUserId(@RequestParam @Positive(message = "id must be positive") @NotNull(message = "id must not be empty") Long id) {
        List<AccountDto> accountDtoList = userAccountService.getAccountsByUserId(id);
        return new ResponseEntity<>(accountDtoList, HttpStatus.OK);

    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/assignAccountToUser")
    public ResponseEntity<Boolean> assignAccountToUser(@RequestParam @Positive(message = "id must be positive") @NotNull(message = "id must not be empty") Long userId, @RequestParam @Positive(message = "id must be positive") @NotNull(message = "id must not be empty") Long accountId) {
        boolean flag = userAccountService.assignAccountToUser(userId, accountId);
        return new ResponseEntity<>(flag, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/accountsNotinUser")
    public ResponseEntity<List<AccountDto>> accountsNotinUser(@RequestParam @Positive(message = "id must be positive") @NotNull(message = "id must not be empty") Long id) {
        List<AccountDto> accountDtoList = userAccountService.accountsNotinUser(id);
        return new ResponseEntity<>(accountDtoList, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/removeAccountFromUser")
    public ResponseEntity<Boolean> removeAccountFromUser(@RequestParam @Positive(message = "id must be positive") @NotNull(message = "id must not be empty") Long userId, @RequestParam @Positive(message = "id must be positive") @NotNull(message = "id must not be empty") Long accountId) {
        boolean deleted = userAccountService.removeAccountFromUser(userId, accountId);
        return new ResponseEntity<>(deleted, HttpStatus.OK);
    }
}
