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
            AdditionOption addOption1 = new AdditionOption(1 , "Đào thêm(3 Pcs)", 15000);
            AdditionOption addOption2 = new AdditionOption(2 , "Sữa tươi(80 ml)", 10000);
            AdditionOption addOption3 = new AdditionOption(3 , "Whipped cream", 15000);
            AdditionOption addOption4 = new AdditionOption(4 , "Espresso shot", 25000);
            AdditionOption addOption5 = new AdditionOption(5 , "Nhãn thêm(4 Pcs)", 15000);

            addOptionRepository.saveAll(Arrays.asList(
                    addOption1, addOption2, addOption3, addOption4, addOption5
            ));

            LOGGER.info("AddOptions Table Seeded.");
        } else {
            LOGGER.trace("AddOptions Seeding Not Required.");
        }
    }

}
