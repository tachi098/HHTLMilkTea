package com.fpt.hhtlmilkteaapi.seed;

import com.fpt.hhtlmilkteaapi.entity.AdditionOption;
import com.fpt.hhtlmilkteaapi.entity.SizeOption;
import com.fpt.hhtlmilkteaapi.repository.IAddOptionRepository;
import com.fpt.hhtlmilkteaapi.repository.IProductRepository;
import com.fpt.hhtlmilkteaapi.repository.ISizeOptionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.Arrays;

@Component
public class SeedAddOptionsTable {

    private static final Logger LOGGER = LoggerFactory.getLogger(SeedAddOptionsTable.class);

    private static IProductRepository productRepository;
    private static IAddOptionRepository addOptionRepository;

    public SeedAddOptionsTable(IProductRepository productRepository, IAddOptionRepository addOptionRepository) {
        this.productRepository = productRepository;
        this.addOptionRepository = addOptionRepository;
    }

    public static void insertData() throws ParseException {
        long count = addOptionRepository.count();
        if(count == 0) {

            // Insert AddOptions
            AdditionOption addOption1 = new AdditionOption(1 , "Rau câu", 2500);
            AdditionOption addOption2 = new AdditionOption(2 , "Thạch dừa", 5000);
            AdditionOption addOption3 = new AdditionOption(3 , "sữa", 7000);

            addOptionRepository.saveAll(Arrays.asList(
                    addOption1, addOption2, addOption3
            ));

            LOGGER.info("AddOptions Table Seeded.");
        } else {
            LOGGER.trace("AddOptions Seeding Not Required.");
        }
    }

}
