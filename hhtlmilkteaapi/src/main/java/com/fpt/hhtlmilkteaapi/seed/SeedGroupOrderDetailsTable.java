package com.fpt.hhtlmilkteaapi.seed;

import com.fpt.hhtlmilkteaapi.entity.*;
import com.fpt.hhtlmilkteaapi.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class SeedGroupOrderDetailsTable {
    private static final Logger LOGGER = LoggerFactory.getLogger(SeedGroupOrderDetailsTable.class);

    private static IGroupMemberRepository groupMemberRepository;
    private static IProductRepository productRepository;
    private static IGroupOrderDetailsRepository groupOrderDetailsRepository;

    public SeedGroupOrderDetailsTable(IGroupMemberRepository groupMemberRepository,
                                      IProductRepository productRepository, IGroupOrderDetailsRepository groupOrderDetailsRepository) {
        this.groupMemberRepository = groupMemberRepository;
        this.productRepository = productRepository;
        this.groupOrderDetailsRepository = groupOrderDetailsRepository;

    }

    public static void insertData() {
        long count = groupOrderDetailsRepository.count();
        if (count == 0) {
            // Insert GroupOrderDetails
            // Insert GroupOrderDetail 01
            Product product01 = productRepository.findById("P0882021035821").get();
            GroupMember groupMember01 = groupMemberRepository.findById(1L).get();
            GroupOrderDetails groupOrderDetails01 = new GroupOrderDetails(1L, "Nhỏ", "Đào thêm", 2, product01.getPrice(),
                    "giao hang nhanh", groupMember01, product01);

            // Insert GroupOrderDetail 02
            Product product02 = productRepository.findById("P0882021035822").get();
            GroupMember groupMember02 = groupMemberRepository.findById(1L).get();
            GroupOrderDetails groupOrderDetails02 = new GroupOrderDetails(2L, "Nhỏ", "Đào thêm", 2, product02.getPrice(),
                    "giao hang nhanh", groupMember02, product02);

            // Insert GroupOrderDetail 03
            Product product03 = productRepository.findById("P0882021035822").get();
            GroupMember groupMember03 = groupMemberRepository.findById(2L).get();
            GroupOrderDetails groupOrderDetails03 = new GroupOrderDetails(3L, "Nhỏ", "Đào thêm", 2, product03.getPrice(),
                    "giao hang nhanh", groupMember03, product03);

            // Insert Data
            groupOrderDetailsRepository.saveAll(Arrays.asList(groupOrderDetails01, groupOrderDetails02, groupOrderDetails03));
            LOGGER.info("GroupOrderDetails Table Seeded.");
        } else {
            LOGGER.trace("GroupOrderDetails Seeding Not Required.");
        }
    }
}
