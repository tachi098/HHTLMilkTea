package com.fpt.hhtlmilkteaapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table(
        name = "user",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        }
)
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String fullName;

    @Temporal(TemporalType.DATE)
    private Date birthday; // 1995-10-29

    private String address;
    private String postcode;
    private String phone;
    private String linkImage;
    private String nameImage;
    private String email;

    @JsonIgnore
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

    @CreationTimestamp
    private Date createdAt;

    @CreationTimestamp
    private Date updatedAt;

    private Date deletedAt;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User(long id, String username, String fullName, Date birthday, String address, String postcode,
                String phone, String linkImage, String nameImage, String email, String password, Date createdAt,
                Date updatedAt) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.birthday = birthday;
        this.address = address;
        this.postcode = postcode;
        this.phone = phone;
        this.linkImage = linkImage;
        this.nameImage = nameImage;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public User(String username, String fullName, Date birthday, String address, String postcode,
                String phone, String linkImage, String nameImage, String email, String password, Set<Role> roles) {
        this.username = username;
        this.fullName = fullName;
        this.birthday = birthday;
        this.address = address;
        this.postcode = postcode;
        this.phone = phone;
        this.linkImage = linkImage;
        this.nameImage = nameImage;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
}
