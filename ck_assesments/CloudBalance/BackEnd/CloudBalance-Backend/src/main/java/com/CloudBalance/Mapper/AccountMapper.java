package com.CloudBalance.Mapper;

import com.CloudBalance.DTO.AccountDto;
import com.CloudBalance.Entity.AccountEntity;
import org.springframework.stereotype.Component;

@Component
public class AccountMapper {

    public AccountEntity dtoToEntity(AccountDto dto) {
        if (dto == null) {
            return null;
        }

        AccountEntity entity = new AccountEntity();
        entity.setId(dto.getId());
        entity.setAccountName(dto.getAccountName());
        entity.setAccountId(dto.getAccountId());
        entity.setResourceName(dto.getResourceName());
        entity.setServiceType(dto.getServiceType());
        entity.setPlatform(dto.getPlatform());
        entity.setInstanceType(dto.getInstanceType());
        entity.setActive(dto.getActive());

        return entity;
    }

    public AccountDto entityToDto(AccountEntity entity) {
        if (entity == null) {
            return null;
        }

        AccountDto dto = new AccountDto();
        dto.setId(entity.getId());
        dto.setAccountName(entity.getAccountName());
        dto.setAccountId(entity.getAccountId());
        dto.setResourceName(entity.getResourceName());
        dto.setServiceType(entity.getServiceType());
        dto.setPlatform(entity.getPlatform());
        dto.setInstanceType(entity.getInstanceType());
        dto.setActive(entity.getActive());

        return dto;
    }
}
