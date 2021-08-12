package com.fpt.hhtlmilkteaapi.repository;

import com.fpt.hhtlmilkteaapi.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByUsernameAndDeletedAtNull(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Boolean existsByEmailAndEmailNotLike(String email, String email2);

    Page<User> findUsersByUsernameNotLikeAndFullNameLike(String username, String fullName, Pageable pageable);

    Page<User> findUsersByUsernameNotLike(String username, Pageable pageable);

    Optional<User> findByEmail(String email);

}
