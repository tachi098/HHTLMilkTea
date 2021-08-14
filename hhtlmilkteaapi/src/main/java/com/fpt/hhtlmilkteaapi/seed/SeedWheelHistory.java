package com.fpt.hhtlmilkteaapi.seed;

import com.fpt.hhtlmilkteaapi.entity.MemberVip;
import com.fpt.hhtlmilkteaapi.entity.Voucher;
import com.fpt.hhtlmilkteaapi.entity.WheelHistory;
import com.fpt.hhtlmilkteaapi.repository.IMemberVipRepository;
import com.fpt.hhtlmilkteaapi.repository.IVoucherRepository;
import com.fpt.hhtlmilkteaapi.repository.IWheelHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;

@Component
public class SeedWheelHistory {

    private static final Logger LOGGER = LoggerFactory.getLogger(SeedWheelHistory.class);

    private static IWheelHistoryRepository wheelHistoryRepository;

    public SeedWheelHistory(IWheelHistoryRepository wheelHistoryRepository) {
        this.wheelHistoryRepository = wheelHistoryRepository;
    }

    public static void insertData() throws ParseException {
        long count = wheelHistoryRepository.count();
        if (count == 0) {

            SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");

            // Insert WheelHistory
            WheelHistory wheelHistory01 = new WheelHistory(1L, "hoaipx", "Nhận được 1000 điểm", format.parse("2021/08/04 09:37:12"));
            WheelHistory wheelHistory02 = new WheelHistory(2L, "vanbich", "Nhận được mã Voucher", format.parse("2021/07/14 19:37:12"));
            WheelHistory wheelHistory03 = new WheelHistory(3L, "tulehoang", "Nhận được mã Voucher", format.parse("2021/06/11 09:17:12"));
            WheelHistory wheelHistory04 = new WheelHistory(4L, "huypquang", "Nhận được 500 điểm", format.parse("2021/3/02 09:37:10"));
            WheelHistory wheelHistory05 = new WheelHistory(5L, "luanluan", "Nhận được 1500 điểm", format.parse("2021/04/04 08:11:12"));
            WheelHistory wheelHistory06 = new WheelHistory(6L, "hoaipx", "Nhận được mã Voucher", format.parse("2021/07/05 01:17:12"));
            WheelHistory wheelHistory07 = new WheelHistory(7L, "tulehoang", "Nhận được 1000 điểm", format.parse("2021/01/04 01:37:12"));

            // Insert Data
            wheelHistoryRepository.saveAll(Arrays.asList(
                    wheelHistory01, wheelHistory02, wheelHistory03, wheelHistory04,
                    wheelHistory05, wheelHistory06, wheelHistory07
            ));
            LOGGER.info("WheelHistory Table Seeded.");
        } else {
            LOGGER.trace("WheelHistory Seeding Not Required.");
        }
    }

}
