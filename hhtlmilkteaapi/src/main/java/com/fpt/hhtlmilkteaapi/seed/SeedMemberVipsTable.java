package com.fpt.hhtlmilkteaapi.seed;

import com.fpt.hhtlmilkteaapi.entity.AdditionOption;
import com.fpt.hhtlmilkteaapi.entity.MemberVip;
import com.fpt.hhtlmilkteaapi.entity.User;
import com.fpt.hhtlmilkteaapi.repository.IMemberVipRepository;
import com.fpt.hhtlmilkteaapi.repository.IUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.Arrays;


@Component
public class SeedMemberVipsTable {

    private static final Logger LOGGER = LoggerFactory.getLogger(SeedMemberVipsTable.class);

    private static IMemberVipRepository memberVipRepository;
    private static IUserRepository userRepository;

    public SeedMemberVipsTable(IMemberVipRepository memberVipRepository, IUserRepository userRepository) {
        this.memberVipRepository = memberVipRepository;
        this.userRepository = userRepository;
    }

    public static void insertData() throws ParseException {

        long count = memberVipRepository.count();

        if(count == 0) {

            // Insert MemberVip 01
            User user01 = userRepository.findById(2L).get();
            MemberVip memberVip01 = new MemberVip(100000, user01);

            memberVipRepository.saveAll(Arrays.asList(memberVip01));

            LOGGER.info("MemberVips Table Seeded.");
        } else {
            LOGGER.trace("MemberVips Seeding Not Required.");
        }
    }
}
