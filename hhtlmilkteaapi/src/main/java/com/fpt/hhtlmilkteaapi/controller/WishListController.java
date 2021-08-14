package com.fpt.hhtlmilkteaapi.controller;

import com.fpt.hhtlmilkteaapi.entity.Product;
import com.fpt.hhtlmilkteaapi.entity.Wishlist;
import com.fpt.hhtlmilkteaapi.payload.request.WishlistRequest;
import com.fpt.hhtlmilkteaapi.payload.response.WishlistResponse;
import com.fpt.hhtlmilkteaapi.repository.IProductRepository;
import com.fpt.hhtlmilkteaapi.repository.IWishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/wishlist")
public class WishListController {

    @Autowired
    private IWishlistRepository wishlistRepository;

    @Autowired
    private IProductRepository productRepository;

    @GetMapping("/list")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getWishLists() {
        return ResponseEntity.ok(wishlistRepository.findAll());
    }

    @PostMapping("")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> addNewWishlist(@RequestBody WishlistRequest wishlistRequest){

        Wishlist checkWishlist = wishlistRepository.findByProductIdAndUserId(wishlistRequest.getProductId(), wishlistRequest.getUserId());

        if(checkWishlist != null){
            wishlistRepository.delete(checkWishlist);
        }else {
            Wishlist wishlist = new Wishlist(wishlistRequest.getUserId(), wishlistRequest.getProductId());
            wishlistRepository.save(wishlist);
        }

        WishlistResponse wishlistResponse = new WishlistResponse();
        // Get all wishlist
        List<Wishlist> wishlists = wishlistRepository.findAllByUserId(wishlistRequest.getUserId());
        List<Product> products = new ArrayList<>();

        for(Wishlist wl : wishlists) {
            products.add(productRepository.findById(wl.getProductId()).get());
        }

        wishlistResponse.setProducts(products);
        wishlistResponse.setQuantity(products.size());

        return  ResponseEntity.ok(wishlistResponse);
    }

    @PutMapping("")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteWishlist(@RequestBody WishlistRequest wishlistRequest){

        Wishlist checkWishlist = wishlistRepository.findByProductIdAndUserId(wishlistRequest.getProductId(), wishlistRequest.getUserId());

        if(checkWishlist != null){
            wishlistRepository.delete(checkWishlist);
        }

        WishlistResponse wishlistResponse = new WishlistResponse();
        // Get all wishlist
        List<Wishlist> wishlists = wishlistRepository.findAllByUserId(wishlistRequest.getUserId());
        List<Product> products = new ArrayList<>();

        for(Wishlist wl : wishlists) {
            products.add(productRepository.findById(wl.getProductId()).get());
        }

        wishlistResponse.setProducts(products);
        wishlistResponse.setQuantity(products.size());
        return  ResponseEntity.ok(wishlistResponse);
    }
}
