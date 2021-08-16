package com.fpt.hhtlmilkteaapi.controller;

import com.fpt.hhtlmilkteaapi.entity.*;
import com.fpt.hhtlmilkteaapi.payload.request.MemberVipRequest;
import com.fpt.hhtlmilkteaapi.payload.request.SpinnerRequest;
import com.fpt.hhtlmilkteaapi.payload.request.UserRequest;
import com.fpt.hhtlmilkteaapi.payload.response.MemberVipResponse;
import com.fpt.hhtlmilkteaapi.payload.response.MessageResponse;
import com.fpt.hhtlmilkteaapi.payload.response.SpinnerResponse;
import com.fpt.hhtlmilkteaapi.payload.response.WishlistResponse;
import com.fpt.hhtlmilkteaapi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/spinner")
public class SpinnerController {

    @Autowired
    private ISpinnerRepository spinnerRepository;

    @Autowired
    private IMemberVipRepository memberVipRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IWishlistRepository wishlistRepository;

    @Autowired
    private IProductRepository productRepository;

    @GetMapping("/list")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> list() {
        List<Spinner> spinners = spinnerRepository.findAll();
        return ResponseEntity.ok(spinners);
    }


    @PostMapping("/insert")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> insert(@Valid @RequestBody SpinnerRequest spinnerRequest) {
        Spinner spinner = new Spinner();
        spinner.setName(spinnerRequest.getName());
        spinner.setColor(spinnerRequest.getColor());
        spinnerRepository.save(spinner);
        List<Spinner> spinners = spinnerRepository.findAll();
        return ResponseEntity.ok(spinners.get(spinners.size() - 1));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable("id") long id) {
        Spinner spinner = spinnerRepository.findById(id).get();
        spinnerRepository.delete(spinner);
        return ResponseEntity.ok(new MessageResponse("Spinner Deleted Data Success!"));
    }

    @PutMapping("/update-mark")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateMark(@RequestBody MemberVipRequest memberVipRequest) {

        User user = userRepository.findByUsername(memberVipRequest.getUsername()).get();
        MemberVip memberVip = memberVipRepository.findByUser(user).get();
        memberVip.setMark(memberVip.getMark() - 1000);
        memberVipRepository.save(memberVip);

        MemberVipResponse memberVipResponse = new MemberVipResponse();
        memberVipResponse.setUser(user);

        // Get all wishlist of user by id
        WishlistResponse wishlistResponse = new WishlistResponse();
        List<Wishlist> wishlists = wishlistRepository.findAllByUserId(memberVipRequest.getId());
        List<Product> products = new ArrayList<>();

        for(Wishlist wl : wishlists) {
            products.add(productRepository.findById(wl.getProductId()).get());
        }

        wishlistResponse.setProducts(products);
        wishlistResponse.setQuantity(products.size());
        memberVipResponse.setWishlistResponse(wishlistResponse);

        return ResponseEntity.ok(memberVipResponse);
    }
}
