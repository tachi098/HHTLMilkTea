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
import java.util.Date;

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
            Order order01 = new Order("O0882021035829","Binh Thanh, Ho Chi Minh", "0123456789", 0, 0, "Không thêm đường", 50, user01, 50000, 15000);

            //Insert Order 2
            Order order02 = new Order("O0882021035830","Binh Thanh, Ho Chi Minh", "0123456789", 1, 4, "Không thêm đường", 50, user01, 50000, 15000);
            //Insert Order 3
            Order order03 = new Order("O0882021035831","Binh Thanh, Ho Chi Minh", "0123456789", 1, 1, "Không thêm đường", 50, user01, 130000, 15000);
            //Insert Order 4
            Order order04 = new Order("O0882021035832","Binh Thanh, Ho Chi Minh", "0123456789", 2, 2, "Không thêm đường", 50, user01, 50000, 15000);
            //Insert Order 5
            Order order05 = new Order("O0882021035833","Binh Thanh, Ho Chi Minh", "0123456789", 1, 3, "Không thêm đường", 50, user01, 50000, 15000);
            //Insert Order 6
            Order order06 = new Order("O0882021035834","Binh Thanh, Ho Chi Minh", "0123456789", 2, 3, "Không thêm đường", 50, user01, 50000, 15000);
            //Insert Order 7
            Order order07 = new Order("O0882021035835","Binh Thanh, Ho Chi Minh", "0123456789", 1, 3, "Không thêm đường", 50, user01, 50000, 15000);
            //Insert Order 8
            Order order08 = new Order("O0882021035836","Binh Thanh, Ho Chi Minh", "0123456789", 2, 3, "Không thêm đường", 50, user01, 50000, 15000);
            //Insert Order 9
            Order order09 = new Order("O0882021035837","Binh Thanh, Ho Chi Minh", "0123456789", 1, 3, "Không thêm đường", 50, user01, 50000, 15000);
            //Insert Order 10
            Order order10 = new Order("O0882021035838","Binh Thanh, Ho Chi Minh", "0123456789", 1, 3, "Không thêm đường", 50, user01, 50000, 15000);
            // Insert Data
            orderRepository.saveAll(Arrays.asList(order01, order02, order03, order04, order05, order06, order07, order08, order09, order10));
            LOGGER.info("Orders Table Seeded.");
        } else {
            LOGGER.trace("Orders Seeding Not Required.");
        }
    }
}
