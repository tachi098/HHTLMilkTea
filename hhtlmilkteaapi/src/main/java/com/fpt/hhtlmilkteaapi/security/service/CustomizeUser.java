package com.fpt.hhtlmilkteaapi.security.service;


import com.fpt.hhtlmilkteaapi.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class CustomizeUser extends User implements UserDetails {

    private Collection<? extends  GrantedAuthority> authorities;

    public CustomizeUser(long id, String username, String fullName, Date birthday, String address,
                         String phone, String linkImage, String nameImage, String email, String password, Date createdAt,
                         Date updatedAt, Collection<? extends GrantedAuthority> authorities) {
        super(id, username, fullName, birthday, address, phone, linkImage, nameImage, email, password,
                createdAt, updatedAt);
        this.authorities = authorities;
    }

    public static CustomizeUser build(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name())).collect(Collectors.toList());

        return new CustomizeUser(
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                user.getBirthday(),
                user.getAddress(),
                user.getPhone(),
                user.getLinkImage(),
                user.getNameImage(),
                user.getEmail(),
                user.getPassword(),
                user.getCreatedAt(),
                user.getUpdatedAt(),
                authorities
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return super.getPassword();
    }

    @Override
    public String getUsername() {
        return super.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
