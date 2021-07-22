package com.fpt.hhtlmilkteaapi.seed;

import com.fpt.hhtlmilkteaapi.entity.Code;
import com.fpt.hhtlmilkteaapi.repository.ICodeRepository;
import com.fpt.hhtlmilkteaapi.repository.IWishlistRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;

@Component
public class SeedCodesTable {
    private static final Logger LOGGER = LoggerFactory.getLogger(SeedCodesTable.class);

    private static ICodeRepository codeRepository;

    public SeedCodesTable(ICodeRepository codeRepository) {
        this.codeRepository = codeRepository;
    }

    public static void insertData() {
        long count = codeRepository.count();
        if (count == 0) {
            // Insert Code
            Code code01 = new Code(1L,"Mã giám giá 1", 100, "hoaipx", new Date());
            Code code02 = new Code(2L,"Mã giám giá 2", 100, "hoaipx", new Date());

            // Insert Data
            codeRepository.saveAll(Arrays.asList(code01, code02));
            LOGGER.info("Code Table Seeded.");
        } else {
            LOGGER.trace("Code Seeding Not Required.");
        }
    }
}
