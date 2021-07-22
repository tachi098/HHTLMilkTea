package com.fpt.hhtlmilkteaapi.seed;

import com.fpt.hhtlmilkteaapi.entity.*;
import com.fpt.hhtlmilkteaapi.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class SeedOrderDetailsTable {
    private static final Logger LOGGER = LoggerFactory.getLogger(SeedOrderDetailsTable.class);

    private static IOrderDetailRepository orderDetailRepository;

    private static IOrderRepository orderRepository;

    public SeedOrderDetailsTable(IOrderRepository orderRepository, IOrderDetailRepository orderDetailRepository) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;

    }

    public static void insertData() {
        long count = orderDetailRepository.count();
        if (count == 0) {
            // Insert OrderDetails
            // Insert OrderDetail 1
            Order order01 = orderRepository.findById(1L).get();
            OrderDetail orderDetail01 = new OrderDetail(1,1L, "1L, 2L", 2, "Giao hang nhanh", order01);

            // Insert Data
            orderDetailRepository.saveAll(Arrays.asList(orderDetail01));
            LOGGER.info("OrderDetails Table Seeded.");
        } else {
            LOGGER.trace("OrderDetails Seeding Not Required.");
        }
    }
}
