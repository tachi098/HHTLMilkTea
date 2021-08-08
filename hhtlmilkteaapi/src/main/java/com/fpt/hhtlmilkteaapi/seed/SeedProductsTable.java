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
            AdditionOption addOption03 = addOptionRepository.findById(3L).get();
            addOptions01.add(addOption01);
            addOptions01.add(addOption02);
            addOptions01.add(addOption03);
            Product product01 = new Product("P0882021035821","Trà Đào Đá Xay", "Peach Tea", "https://res.cloudinary.com/fpt-aptech-hhtl/image/upload/v1628410434/product/tradaoxay.png", "tradaoxay",
                    65000, category01, sizeOptions01, addOptions01);

            // Insert Product2
            Category category02 = categoryRepository.findById(2L).get();
            Product product02 = new Product("P0882021035822","Trà Vải Tươi Dầm", "Ice Shaken Lychee Tea", "https://res.cloudinary.com/fpt-aptech-hhtl/image/upload/v1628411118/product/travai.png", "travai",
                    40000, category02, null, null);

            // Insert Product3
            Set<SizeOption> sizeOptions03 = new HashSet<>();
            SizeOption sizeOption03 = sizeOptionRepository.findById(3L).get();
            sizeOptions03.add(sizeOption03);
            Set<AdditionOption> addOptions03 = new HashSet<>();
            addOptions03.add(addOption02);
            addOptions03.add(addOption03);
            Product product03 = new Product("P0882021035823","Trà Sữa Phúc Long", "Phuc Long Tea Latte", "https://res.cloudinary.com/fpt-aptech-hhtl/image/upload/v1628411720/product/phuclong.png", "phuclong",
                    50000, category01, sizeOptions03, addOptions03);

            // Insert Product4
            Set<SizeOption> sizeOptions04 = new HashSet<>();
            sizeOptions04.add(sizeOption03);
            Set<AdditionOption> addOptions04 = new HashSet<>();
            AdditionOption addOption04 = addOptionRepository.findById(5L).get();
            addOptions04.add(addOption04);
            addOptions04.add(addOption01);
            Product product04 = new Product("P0882021035824","Trà Đào Phúc Long", "Phuc Long Peach Tea", "https://res.cloudinary.com/fpt-aptech-hhtl/image/upload/v1628411771/product/tradao.png", "tradao",
                    55000, category01, sizeOptions04, addOptions04);

            // Insert Product5
            Set<AdditionOption> addOptions05 = new HashSet<>();
            addOptions05.add(addOption01);
            addOptions05.add(addOption02);
            Product product05 = new Product("P0882021035825","Hồng Trà Sữa", "Phuc Long Black Milk Tea", "https://res.cloudinary.com/fpt-aptech-hhtl/image/upload/v1628411720/product/phuclong.png", "phuclong",
                    50000, category01, sizeOptions03, addOptions05);

            // Insert Product6
            Product product06 = new Product("P0882021035826","Trà Ô Long Sữa", "Oolong Milk Tea", "https://res.cloudinary.com/fpt-aptech-hhtl/image/upload/v1628411720/product/phuclong.png", "phuclong",
                    50000, category01, sizeOptions03, addOptions05);

            // Insert Product7
            Product product07 = new Product("P0882021035827","Trà Đào Sữa", "Peach Milk Tea", "https://res.cloudinary.com/fpt-aptech-hhtl/image/upload/v1628411720/product/phuclong.png", "phuclong",
                    45000, category01, sizeOptions03, addOptions05);

            // Insert Product8
            Set<SizeOption> sizeOptions05 = new HashSet<>();
            sizeOptions05.add(sizeOption02);
            Set<AdditionOption> addOptions06 = new HashSet<>();
            AdditionOption addOption05 = addOptionRepository.findById(4L).get();
            addOptions06.add(addOption05);
            addOptions06.add(addOption01);
            addOptions06.add(addOption02);
            addOptions06.add(addOption03);
            Product product08 = new Product("P0882021035828","Cà Phê Espresso", "Espresso Coffee", "https://res.cloudinary.com/fpt-aptech-hhtl/image/upload/v1628412575/product/espresso.png", "espresso",
                    30000, category02, sizeOptions05, addOptions06);

            //Insert Product 9
            Set<AdditionOption> addOptions07 = new HashSet<>();
            addOptions07.add(addOption04);
            addOptions07.add(addOption02);
            addOptions07.add(addOption03);
            Product product09 = new Product("P0882021035829","Cà Phê Latte", "Latte Coffee", "https://res.cloudinary.com/fpt-aptech-hhtl/image/upload/v1628412981/product/latte.png", "latte",
                    50000, category01, sizeOptions05, addOptions07);


            // Insert Data
            productRepository.saveAll(Arrays.asList(product01, product02, product03, product04, product05, product06, product07, product08, product09));
            LOGGER.info("Products Table Seeded.");
        } else {
            LOGGER.trace("Products Seeding Not Required.");
        }
    }
}
