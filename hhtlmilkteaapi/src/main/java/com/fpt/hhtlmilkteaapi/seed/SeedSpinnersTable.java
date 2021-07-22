package com.fpt.hhtlmilkteaapi.seed;

import com.fpt.hhtlmilkteaapi.entity.Code;
import com.fpt.hhtlmilkteaapi.entity.Spinner;
import com.fpt.hhtlmilkteaapi.repository.ICodeRepository;
import com.fpt.hhtlmilkteaapi.repository.ISpinnerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;

@Component
public class SeedSpinnersTable {
    private static final Logger LOGGER = LoggerFactory.getLogger(SeedSpinnersTable.class);

    private static ISpinnerRepository spinnerRepository;

    public SeedSpinnersTable(ISpinnerRepository spinnerRepository) {
        this.spinnerRepository = spinnerRepository;
    }

    public static void insertData() {
        long count = spinnerRepository.count();
        if (count == 0) {
            // Insert Spinner
            Spinner spinner01 = new Spinner(1L,"Mã giảm", "red");
            Spinner spinner02 = new Spinner(2L,"Cộng điểm", "blue");

            // Insert Data
            spinnerRepository.saveAll(Arrays.asList(spinner01, spinner02));
            LOGGER.info("Spinner Table Seeded.");
        } else {
            LOGGER.trace("Spinner Seeding Not Required.");
        }
    }
}
