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

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
        try {
            long count = orderRepository.count();
            if (count == 0) {
                //simple date format
                SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                // Insert Orders
                // Insert Order 1
                User user01 = userRepository.findById(2L).get();
                Order order01 = new Order("O0882021035829", "Binh Thanh, Ho Chi Minh", "0123456789", 0, 0, "Không thêm đường", 50, user01, 50000, 15000, format.parse("2020-03-15 09:37:12"));
                order01.setTeam(true);
                //Insert Order 2
                Order order02 = new Order("O0882021035830", "Binh Thanh, Ho Chi Minh", "0123456789", 1, 4, "Không thêm đường", 50, user01, 120000, 15000, format.parse("2020-03-15 09:37:12"));
                //Insert Order 3
                Order order03 = new Order("O0882021035831", "Binh Thanh, Ho Chi Minh", "0123456789", 1, 1, "Không thêm đường", 50, user01, 130000, 15000, format.parse("2020-03-15 09:37:12"));
                //Insert Order 4
                Order order04 = new Order("O0882021035832", "Binh Thanh, Ho Chi Minh", "0123456789", 2, 2, "Không thêm đường", 50, user01, 240000, 15000, format.parse("2020-03-15 09:37:12"));

                //Insert Order 5
                Order order05 = new Order("O0882021035833", "Binh Thanh, Ho Chi Minh", "0123456789", 1, 3, "Không thêm đường", 50, user01, 60000, 15000, format.parse("2020-03-15 09:37:12"));
                //Insert Order 6
                Order order06 = new Order("O0882021035834", "Binh Thanh, Ho Chi Minh", "0123456789", 2, 3, "Không thêm đường", 50, user01, 75000, 15000, format.parse("2020-04-15 00:00:00"));
                //Insert Order 7
                Order order07 = new Order("O0882021035835", "Binh Thanh, Ho Chi Minh", "0123456789", 1, 3, "Không thêm đường", 50, user01, 90000, 15000, format.parse("2020-05-15 00:00:00"));
                //Insert Order 8
                Order order08 = new Order("O0882021035836", "Binh Thanh, Ho Chi Minh", "0123456789", 2, 3, "Không thêm đường", 50, user01, 85000, 15000, format.parse("2020-06-15 00:00:00"));
                //Insert Order 9
                Order order09 = new Order("O0882021035837", "Binh Thanh, Ho Chi Minh", "0123456789", 1, 3, "Không thêm đường", 50, user01, 40000, 15000, format.parse("2020-07-15 00:00:00"));
                //Insert Order 10
                Order order10 = new Order("O0882021035838", "Binh Thanh, Ho Chi Minh", "0123456789", 1, 3, "Không thêm đường", 50, user01, 130000, 15000, format.parse("2020-08-15 00:00:00"));
                //Insert Order 11
                Order order11 = new Order("O0882021035839", "Binh Thanh, Ho Chi Minh", "0123456789", 1, 3, "Không thêm đường", 50, user01, 220000, 15000, format.parse("2020-09-15 00:00:00"));
                //Insert Order 12
                Order order12 = new Order("O0882021035840", "Binh Thanh, Ho Chi Minh", "0123456789", 1, 3, "Không thêm đường", 50, user01, 180000, 15000, format.parse("2020-10-15 00:00:00"));
                //Insert Order 13
                Order order13 = new Order("O0882021035841", "Binh Thanh, Ho Chi Minh", "0123456789", 1, 3, "Không thêm đường", 50, user01, 190000, 15000, format.parse("2020-11-15 00:00:00"));
                //Insert Order 14
                Order order14 = new Order("O0882021035842", "Binh Thanh, Ho Chi Minh", "0123456789", 1, 3, "Không thêm đường", 50, user01, 60000, 15000, format.parse("2020-12-15 00:00:00"));
                //Insert Order 15
                Order order15 = new Order("O0882021035843", "Binh Thanh, Ho Chi Minh", "0123456789", 1, 3, "Không thêm đường", 50, user01, 240000, 15000, format.parse("2021-01-15 00:00:00"));
                //Insert Order 16
                Order order16 = new Order("O0882021035844", "Binh Thanh, Ho Chi Minh", "0123456789", 1, 3, "Không thêm đường", 50, user01, 75000, 15000, format.parse("2021-02-15 00:00:00"));
                //Insert Order 17
                Order order17 = new Order("O0882021035845", "Binh Thanh, Ho Chi Minh", "0123456789", 1, 3, "Không thêm đường", 50, user01, 90000, 15000, format.parse("2021-03-15 00:00:00"));
                //Insert Order 18
                Order order18 = new Order("O0882021035846", "Binh Thanh, Ho Chi Minh", "0123456789", 1, 3, "Không thêm đường", 50, user01, 110000, 15000, format.parse("2021-04-15 00:00:00"));
                //Insert Order 19
                Order order19 = new Order("O0882021035847", "Binh Thanh, Ho Chi Minh", "0123456789", 1, 3, "Không thêm đường", 50, user01, 140000, 15000, format.parse("2021-05-15 00:00:00"));
                //Insert Order 20
                Order order20 = new Order("O0882021035848", "Binh Thanh, Ho Chi Minh", "0123456789", 1, 3, "Không thêm đường", 50, user01, 280000, 15000, format.parse("2021-06-15 00:00:00"));
                //Insert Order 21
                Order order21 = new Order("O0882021035849", "Binh Thanh, Ho Chi Minh", "0123456789", 1, 3, "Không thêm đường", 50, user01, 60000, 15000, format.parse("2021-07-15 00:00:00"));
                //Insert Order 22
                Order order22 = new Order("O0882021035850", "Binh Thanh, Ho Chi Minh", "0123456789", 1, 3, "Không thêm đường", 50, user01, 80000, 15000, format.parse("2021-08-15 00:00:00"));
                //Insert Order 23
                Order order23 = new Order("O0882021035851", "Binh Thanh, Ho Chi Minh", "0123456789", 1, 3, "Không thêm đường", 50, user01, 80000, 15000, new Date());


                // Insert Data
                orderRepository.saveAll(Arrays.asList(order01, order02, order03, order04, order05, order06, order07, order08, order09, order10, order11, order12, order13, order14, order15, order16, order17, order18, order19, order20, order21, order22, order23));
                LOGGER.info("Orders Table Seeded.");


            } else {
                LOGGER.trace("Orders Seeding Not Required.");
            }
        } catch (Exception e){
            e.printStackTrace();
        }
    }
}
