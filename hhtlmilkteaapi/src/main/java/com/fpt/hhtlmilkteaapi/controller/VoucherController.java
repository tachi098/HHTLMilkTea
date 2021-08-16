package com.fpt.hhtlmilkteaapi.controller;

import com.fpt.hhtlmilkteaapi.entity.*;
import com.fpt.hhtlmilkteaapi.payload.request.VoucherRequest;
import com.fpt.hhtlmilkteaapi.payload.response.MessageResponse;
import com.fpt.hhtlmilkteaapi.payload.response.VoucherResponse;
import com.fpt.hhtlmilkteaapi.payload.response.WishlistResponse;
import com.fpt.hhtlmilkteaapi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/voucher")
public class VoucherController {

    @Autowired
    private IVoucherRepository voucherRepository;

    @Autowired
    private ICodeRepository codeRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IMemberVipRepository memberVipRepository;

    @Autowired
    private IWishlistRepository wishlistRepository;

    @Autowired
    private IProductRepository productRepository;

    @GetMapping("/list")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getCodes() {

        // Get codes reverse
        List<Code> codes = codeRepository.findAllByEndDateGreaterThanEqualAndDeletedAtNull(new Date());
        Collections.sort(codes, (a, b) -> (int) -(a.getId() - b.getId()));
        return ResponseEntity.ok(codes);
    }

    @PutMapping("/check-code")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> checkCode(@RequestBody VoucherRequest voucherRequest) {

        if(!codeRepository.existsByName(voucherRequest.getCode())) {
            return ResponseEntity.ok(new MessageResponse("Mã không hợp lệ"));
        }

        if(codeRepository.existsByNameAndEndDateLessThanEqual(voucherRequest.getCode(), new Date())) {
            return ResponseEntity.ok(new MessageResponse("Mã đã hết hạn không hợp lệ"));
        }

        if(voucherRepository.existsByCodeName(voucherRequest.getCode())) {
            return ResponseEntity.ok(new MessageResponse("Mã đã được sử dụng"));
        }

        // Insert code for Table Voucher
        Voucher voucher = new Voucher();
        voucher.setCodeName(voucherRequest.getCode());
        voucher.setUserName(voucherRequest.getUsername());
        voucherRepository.save(voucher);

        // Get code to update deletedAt not null
        Code code = codeRepository.findByName(voucherRequest.getCode()).get();
        code.setDeletedAt(new Date());
        codeRepository.save(code);

        User user = userRepository.findByUsername(voucherRequest.getUsername()).get();
        MemberVip memberVip = memberVipRepository.findByUser(user).get();
        memberVip.setMark(memberVip.getMark() + code.getMark());
        memberVipRepository.save(memberVip);

        // List codes news after update deletedAt
        List<Code> codes = codeRepository.findAllByEndDateGreaterThanEqualAndDeletedAtNull(new Date());
        User userNew = userRepository.findByUsername(voucherRequest.getUsername()).get();


        // Get all wishlist of user by id
        WishlistResponse wishlistResponse = new WishlistResponse();
        List<Wishlist> wishlists = wishlistRepository.findAllByUserId(voucherRequest.getId());
        List<Product> products = new ArrayList<>();

        for(Wishlist wl : wishlists) {
            products.add(productRepository.findById(wl.getProductId()).get());
        }

        wishlistResponse.setProducts(products);
        wishlistResponse.setQuantity(products.size());

        // Set codes + user for VoucherResponse
        VoucherResponse voucherResponse = new VoucherResponse();
        voucherResponse.setCodes(codes);
        voucherResponse.setUser(userNew);
        voucherResponse.setWishlistResponse(wishlistResponse);
        voucherResponse.setMessage("Mã được sử dụng thành công");

        return ResponseEntity.ok(voucherResponse);
    }
}
