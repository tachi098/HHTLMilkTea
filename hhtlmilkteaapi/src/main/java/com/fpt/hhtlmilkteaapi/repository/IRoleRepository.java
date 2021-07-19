package com.fpt.hhtlmilkteaapi.repository;

import com.fpt.hhtlmilkteaapi.config.ERole;
import com.fpt.hhtlmilkteaapi.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(ERole name);

}
