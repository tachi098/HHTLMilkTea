package com.fpt.hhtlmilkteaapi.seed;

import com.fpt.hhtlmilkteaapi.entity.Spinner;
import com.fpt.hhtlmilkteaapi.repository.ISpinnerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

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
            Spinner spinner01 = new Spinner(1L,"Voucher", "#F0CF50");
            Spinner spinner02 = new Spinner(2L,"1000", "#EE4040");
            Spinner spinner03 = new Spinner(3L,"May mắn lần sau", "#815CD1");
            Spinner spinner04 = new Spinner(4L,"500", "#3DA5E0");
            Spinner spinner05 = new Spinner(5L,"Voucher", "#34A24F");
            Spinner spinner06 = new Spinner(6L,"May mắn lần sau", "#F9AA1F");
            Spinner spinner07 = new Spinner(7L,"1500", "#EC3F3F");
            Spinner spinner08 = new Spinner(8L,"May mắn lần sau", "#FF9000");

            // Insert Data
            spinnerRepository.saveAll(Arrays.asList(
                    spinner01, spinner02, spinner03, spinner04, spinner05, spinner06, spinner07, spinner08
            ));
            LOGGER.info("Spinner Table Seeded.");
        } else {
            LOGGER.trace("Spinner Seeding Not Required.");
        }
    }
}
