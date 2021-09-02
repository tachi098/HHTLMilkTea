package com.fpt.hhtlmilkteaapi.controller;

import com.fpt.hhtlmilkteaapi.entity.*;
import com.fpt.hhtlmilkteaapi.payload.request.RatingRequest;
import com.fpt.hhtlmilkteaapi.repository.IMemberVipRepository;
import com.fpt.hhtlmilkteaapi.repository.IOrderRepository;
import com.fpt.hhtlmilkteaapi.repository.IRatingRepository;
import com.fpt.hhtlmilkteaapi.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/rating")
public class RatingController {
    @Autowired
    private IRatingRepository ratingRepository;

    @Autowired
    private IOrderRepository orderRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IMemberVipRepository memberVipRepository;

    @GetMapping("/list")
    public ResponseEntity<?> getRating(){
        return ResponseEntity.ok(ratingRepository.findAll());
    }

    @GetMapping("/page")
    public ResponseEntity<?> getRatingPageList(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(defaultValue = "") String keyword
    ) {
        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).descending() : Sort.by(sortField).ascending()
        );

        Page<Rating> ratings = "".equals(keyword) ?
                ratingRepository.findAll(pageable) :
                ratingRepository.findRatingByUsernameLike("%" + keyword + "%", pageable);
        return ResponseEntity.ok(ratings);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addRating(@RequestBody RatingRequest ratingRequest){

        String username = ratingRequest.getUsername();
        String orderId = ratingRequest.getOrderId();
        String content = ratingRequest.getContent();
        int rate = ratingRequest.getRate();

        // Create Rating
        Rating rating = new Rating(content, rate, username, orderId);
        ratingRepository.save(rating);

        // Update Order
        Order order = orderRepository.findById(orderId).get();
        order.setRating(true);

        User user = userRepository.findByUsername(username).get();
        MemberVip memberVip = memberVipRepository.findByUser(user).get();

        memberVip.setMark(memberVip.getMark() + 100);
        memberVipRepository.save(memberVip);

        orderRepository.save(order);

        return ResponseEntity.ok(rating);
    }
}
