package com.fpt.hhtlmilkteaapi.repository;

import com.fpt.hhtlmilkteaapi.entity.Code;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ICodeRepository extends JpaRepository<Code, Long> {

    List<Code> findAllByEndDateGreaterThanEqualAndDeletedAtNull(Date date);

    List<Code> findAllByEndDateGreaterThanEqualAndDeletedAtNullAndUsername(Date endDate, String username);

    Boolean existsByName(String name); // Exception: exist

    Boolean existsByNameAndEndDateLessThanEqual(String name, Date date); // Exception: exist and expiry date

    Optional<Code> findByName(String name); // Find code by code name

}
