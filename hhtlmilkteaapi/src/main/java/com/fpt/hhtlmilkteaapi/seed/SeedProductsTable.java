package com.fpt.hhtlmilkteaapi.seed;

import com.fpt.hhtlmilkteaapi.entity.*;
import com.fpt.hhtlmilkteaapi.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Component
public class SeedProductsTable {
    private static final Logger LOGGER = LoggerFactory.getLogger(SeedProductsTable.class);

    private static IProductRepository productRepository;

    private static ICategoryRepository categoryRepository;

    private static ISizeOptionRepository sizeOptionRepository;

    private static IAddOptionRepository addOptionRepository;

    private static ISaleOffRepository saleOffRepository;

    public SeedProductsTable(IProductRepository productRepository, ICategoryRepository categoryRepository, ISizeOptionRepository sizeOptionRepository, IAddOptionRepository addOptionRepository,  ISaleOffRepository saleOffRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.sizeOptionRepository = sizeOptionRepository;
        this.addOptionRepository = addOptionRepository;
        this.saleOffRepository = saleOffRepository;
    }


    public static void insertData() {
        long count = productRepository.count();

        if (count == 0) {
            // Insert Products
            // Insert Product1
            Category category01 = categoryRepository.findById(2L).get();
            Set<SizeOption> sizeOptions01 = new HashSet<>();
            SizeOption sizeOption01 = sizeOptionRepository.findById(1L).get();
            SizeOption sizeOption02 = sizeOptionRepository.findById(2L).get();
            sizeOptions01.add(sizeOption01);
            sizeOptions01.add(sizeOption02);
            Set<AdditionOption> addOptions01 = new HashSet<>();
            AdditionOption addOption01 = addOptionRepository.findById(1L).get();
            AdditionOption addOption02 = addOptionRepository.findById(2L).get();
            addOptions01.add(addOption01);
            addOptions01.add(addOption02);
            Product product01 = new Product("P001","Tra sua", "Milktea", null, null,
                    2500, category01, sizeOptions01, addOptions01);

            // Insert Product2
            Category category02 = categoryRepository.findById(2L).get();
            Set<SizeOption> sizeOptions02 = new HashSet<>();
            SizeOption sizeOption03 = sizeOptionRepository.findById(2L).get();
            sizeOptions02.add(sizeOption03);
            Set<AdditionOption> addOptions02 = new HashSet<>();
            AdditionOption addOption03 = addOptionRepository.findById(3L).get();
            addOptions02.add(addOption03);
            Product product02 = new Product("P002","Tra sua mam tom", "Milktea", null, null,
                    2500, category02, sizeOptions02, addOptions02);

            // Insert Data
            productRepository.saveAll(Arrays.asList(product01, product02));
            LOGGER.info("Products Table Seeded.");
        } else {
            LOGGER.trace("Products Seeding Not Required.");
        }
    }
}
