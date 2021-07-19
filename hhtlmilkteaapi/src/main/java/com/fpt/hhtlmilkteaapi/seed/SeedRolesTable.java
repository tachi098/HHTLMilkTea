package com.fpt.hhtlmilkteaapi.seed;

import com.fpt.hhtlmilkteaapi.config.ERole;
import com.fpt.hhtlmilkteaapi.entity.Role;
import com.fpt.hhtlmilkteaapi.repository.IRoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class SeedRolesTable {

    private static final Logger LOGGER = LoggerFactory.getLogger(SeedRolesTable.class);

    private static IRoleRepository roleRepository;

    public SeedRolesTable(IRoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public static void insertData() {
        long count = roleRepository.count();
        if (count == 0) {
            // Insert Roles
            Role role01 = new Role(ERole.ROLE_ADMIN);
            Role role02 = new Role(ERole.ROLE_USER);

            // Insert Data
            roleRepository.saveAll(Arrays.asList(role01, role02));
            LOGGER.info("Roles Table Seeded.");
        } else {
            LOGGER.trace("Roles Seeding Not Required.");
        }
    }

}
