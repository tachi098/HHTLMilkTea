package com.fpt.hhtlmilkteaapi.seed;

import com.fpt.hhtlmilkteaapi.entity.Category;
import com.fpt.hhtlmilkteaapi.entity.Wishlist;
import com.fpt.hhtlmilkteaapi.repository.ICategoryRepository;
import com.fpt.hhtlmilkteaapi.repository.IWishlistRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class SeedWishlistsTable {
    private static final Logger LOGGER = LoggerFactory.getLogger(SeedWishlistsTable.class);

    private static IWishlistRepository wishlistRepository;

    public SeedWishlistsTable(IWishlistRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }

    public static void insertData() {
        long count = wishlistRepository.count();
        if (count == 0) {
            // Insert Wishlist
            Wishlist wishlist01 = new Wishlist(1L,2L, "P0882021035821");
            Wishlist wishlist02 = new Wishlist(2L,2L, "P0882021035821");

            // Insert Data
            wishlistRepository.saveAll(Arrays.asList(wishlist01, wishlist02));
            LOGGER.info("Wishlist Table Seeded.");
        } else {
            LOGGER.trace("Wishlist Seeding Not Required.");
        }
    }
}
