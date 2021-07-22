package com.fpt.hhtlmilkteaapi.controller;

import com.fpt.hhtlmilkteaapi.repository.IWishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/wishlist")
public class WishListController {

    @Autowired
    private IWishlistRepository wishlistRepository;

    @GetMapping("/list")
    public ResponseEntity<?> getWishLists() {
        return ResponseEntity.ok(wishlistRepository.findAll());
    }
}
