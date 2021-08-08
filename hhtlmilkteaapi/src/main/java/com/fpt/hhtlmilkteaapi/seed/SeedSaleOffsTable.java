package com.fpt.hhtlmilkteaapi.seed;

import com.fpt.hhtlmilkteaapi.entity.Product;
import com.fpt.hhtlmilkteaapi.entity.SaleOff;
import com.fpt.hhtlmilkteaapi.repository.IProductRepository;
import com.fpt.hhtlmilkteaapi.repository.ISaleOffRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;

@Component
public class SeedSaleOffsTable {
    private static final Logger LOGGER = LoggerFactory.getLogger(SeedSaleOffsTable.class);

    private static ISaleOffRepository saleOffRepository;
    private static IProductRepository productRepository;

    public SeedSaleOffsTable(ISaleOffRepository saleOffRepository, IProductRepository productRepository) {
        this.saleOffRepository = saleOffRepository;
        this.productRepository = productRepository;
    }

    public static void insertData() {

        long count = saleOffRepository.count();

        if (count == 0) {

            Product product01 = productRepository.findById("P0882021035821").get();
            Product product02 = productRepository.findById("P0882021035822").get();

            SaleOff saleOff01 = new SaleOff(1,0.3, new Date(), product01);
            SaleOff saleOff02 = new SaleOff(2,0.15, new Date(), product02);

            // Insert Data
            saleOffRepository.saveAll(Arrays.asList(saleOff01, saleOff02));
            LOGGER.info("SaleOffs Table Seeded.");
        } else {
            LOGGER.trace("SaleOffs Seeding Not Required.");
        }
    }
}
