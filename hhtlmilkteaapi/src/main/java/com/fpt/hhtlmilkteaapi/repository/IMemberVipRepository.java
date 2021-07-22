package com.fpt.hhtlmilkteaapi.repository;


import com.fpt.hhtlmilkteaapi.entity.MemberVip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IMemberVipRepository extends JpaRepository<MemberVip, Long> {
}
