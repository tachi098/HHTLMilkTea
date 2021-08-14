package com.fpt.hhtlmilkteaapi.repository;

import com.fpt.hhtlmilkteaapi.entity.Category;
import com.fpt.hhtlmilkteaapi.entity.SizeOption;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISizeOptionRepository extends JpaRepository<SizeOption, Long> {
    Page<SizeOption> findSizeOptionsByNameLike(String keyword, Pageable pageable);
}
