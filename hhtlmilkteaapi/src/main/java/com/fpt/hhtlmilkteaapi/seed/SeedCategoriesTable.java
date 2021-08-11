package com.fpt.hhtlmilkteaapi.seed;

import com.fpt.hhtlmilkteaapi.entity.Category;
import com.fpt.hhtlmilkteaapi.repository.ICategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class SeedCategoriesTable {
    private static final Logger LOGGER = LoggerFactory.getLogger(SeedCategoriesTable.class);

    private static ICategoryRepository categoryRepository;

    public SeedCategoriesTable(ICategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public static void insertData() {
        long count = categoryRepository.count();
        if (count == 0) {
            // Insert Categories
            Category category01 = new Category(1,"Phuc Long Signature");
            Category category02 = new Category(2,"Snack");
            Category category03 = new Category(3,"Product");
            Category category04 = new Category(4,"Special tea");
            Category category05 = new Category(5,"Classic coffee");


            // Insert Data
            categoryRepository.saveAll(Arrays.asList(category01, category02, category03, category04, category05));
            LOGGER.info("Categories Table Seeded.");
        } else {
            LOGGER.trace("Categories Seeding Not Required.");
        }
    }
}
