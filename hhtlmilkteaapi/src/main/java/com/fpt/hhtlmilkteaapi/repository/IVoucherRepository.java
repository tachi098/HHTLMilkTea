package com.fpt.hhtlmilkteaapi.repository;

import com.fpt.hhtlmilkteaapi.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IVoucherRepository extends JpaRepository<Voucher, Long> {

    Boolean existsByCodeName(String codeName); // Exception: used

}
