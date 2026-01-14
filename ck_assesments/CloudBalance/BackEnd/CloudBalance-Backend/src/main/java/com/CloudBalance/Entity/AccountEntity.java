package com.CloudBalance.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import jakarta.validation.constraints.NotBlank;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "accounts")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@DynamicUpdate
public class AccountEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String accountName;
    private String accountId;
    private String resourceName;
    private String serviceType;
    private String platform;
    private String instanceType;

    @Override
    public String toString() {
        return "AccountEntity{" +
                "id=" + id +
                ", accountName='" + accountName + '\'' +
                ", accountId='" + accountId + '\'' +
                ", resourceName='" + resourceName + '\'' +
                ", serviceType='" + serviceType + '\'' +
                ", platform='" + platform + '\'' +
                ", instanceType='" + instanceType + '\'' +
                ", active=" + active +
                '}';
    }

    private boolean active;

    @ManyToMany(mappedBy = "accounts")
    private Set<UserEntity> users;

}
