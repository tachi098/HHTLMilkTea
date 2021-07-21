package com.fpt.hhtlmilkteaapi.seed;

import com.fpt.hhtlmilkteaapi.config.ERole;
import com.fpt.hhtlmilkteaapi.entity.Role;
import com.fpt.hhtlmilkteaapi.entity.SizeOption;
import com.fpt.hhtlmilkteaapi.entity.User;
import com.fpt.hhtlmilkteaapi.repository.IProductRepository;
import com.fpt.hhtlmilkteaapi.repository.IRoleRepository;
import com.fpt.hhtlmilkteaapi.repository.ISizeOptionRepository;
import com.fpt.hhtlmilkteaapi.repository.IUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.validation.constraints.Size;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
public class SeedSizeOptionsTable {

    private static final Logger LOGGER = LoggerFactory.getLogger(SeedSizeOptionsTable.class);

    private static IProductRepository productRepository;
    private static ISizeOptionRepository sizeOptionRepository;

    public SeedSizeOptionsTable(IProductRepository productRepository, ISizeOptionRepository sizeOptionRepository) {
        this.productRepository = productRepository;
        this.sizeOptionRepository = sizeOptionRepository;
    }

    public static void insertData() throws ParseException {
        long count = sizeOptionRepository.count();
        if(count == 0) {

            // Insert SizeOptions
            SizeOption sizeOption1 = new SizeOption(1 , "Nhỏ", 2500);
            SizeOption sizeOption2 = new SizeOption(2 , "Vừa", 5000);
            SizeOption sizeOption3 = new SizeOption(3 , "Lớn", 7000);

            sizeOptionRepository.saveAll(Arrays.asList(
                    sizeOption1, sizeOption2, sizeOption3
            ));

            LOGGER.info("SizeOptions Table Seeded.");
        } else {
            LOGGER.trace("SizeOptions Seeding Not Required.");
        }
    }

}
