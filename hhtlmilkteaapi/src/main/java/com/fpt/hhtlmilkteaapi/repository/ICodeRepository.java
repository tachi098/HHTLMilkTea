package com.fpt.hhtlmilkteaapi.repository;

import com.fpt.hhtlmilkteaapi.entity.Code;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICodeRepository extends JpaRepository<Code, Long> {
}
