package com.fpt.hhtlmilkteaapi.seed;

import com.fpt.hhtlmilkteaapi.entity.Category;
import com.fpt.hhtlmilkteaapi.entity.Order;
import com.fpt.hhtlmilkteaapi.entity.User;
import com.fpt.hhtlmilkteaapi.repository.ICategoryRepository;
import com.fpt.hhtlmilkteaapi.repository.IOrderRepository;
import com.fpt.hhtlmilkteaapi.repository.IUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class SeedOrdersTable {
    private static final Logger LOGGER = LoggerFactory.getLogger(SeedOrdersTable.class);

    private static IOrderRepository orderRepository;

    private static IUserRepository userRepository;

    public SeedOrdersTable(IOrderRepository orderRepository, IUserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    public static void insertData() {
        long count = orderRepository.count();
        if (count == 0) {
            // Insert Orders
            // Insert Order 1
            User user01 = userRepository.findById(2L).get();
            Order order01 = new Order(1,"Binh Thanh, Ho Chi Minh", "0123456789", 0, "Không thêm đường", 50, user01);

            // Insert Data
            orderRepository.saveAll(Arrays.asList(order01));
            LOGGER.info("Orders Table Seeded.");
        } else {
            LOGGER.trace("Orders Seeding Not Required.");
        }
    }
}
