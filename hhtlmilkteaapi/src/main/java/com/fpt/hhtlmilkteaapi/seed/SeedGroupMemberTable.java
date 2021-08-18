package com.fpt.hhtlmilkteaapi.seed;

import com.fpt.hhtlmilkteaapi.entity.GroupMember;
import com.fpt.hhtlmilkteaapi.entity.Order;
import com.fpt.hhtlmilkteaapi.entity.Wishlist;
import com.fpt.hhtlmilkteaapi.repository.IGroupMemberRepository;
import com.fpt.hhtlmilkteaapi.repository.IOrderRepository;
import com.fpt.hhtlmilkteaapi.repository.IWishlistRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class SeedGroupMemberTable {
    private static final Logger LOGGER = LoggerFactory.getLogger(SeedGroupMemberTable.class);

    private static IGroupMemberRepository groupMemberRepository;
    private static IOrderRepository orderRepository;

    public SeedGroupMemberTable(IGroupMemberRepository groupMemberRepository, IOrderRepository orderRepository) {
        this.groupMemberRepository = groupMemberRepository;
        this.orderRepository = orderRepository;
    }

    public static void insertData() {
        long count = groupMemberRepository.count();
        if (count == 0) {
            // Insert GroupMember 01
            Order order01 = orderRepository.findById("O0882021035829").get();
            GroupMember groupMember01 = new GroupMember(1L, "Phạm Xuân Hoài", "vanbich", order01);

            // Insert GroupMember 01
            Order order02 = orderRepository.findById("O0882021035829").get();
            GroupMember groupMember02 = new GroupMember(2L, "Phạm Quang Huy", "vanbich", order02);

            // Insert Data
            groupMemberRepository.saveAll(Arrays.asList(groupMember01, groupMember02));
            LOGGER.info("GroupMember Table Seeded.");
        } else {
            LOGGER.trace("GroupMember Seeding Not Required.");
        }
    }
}
