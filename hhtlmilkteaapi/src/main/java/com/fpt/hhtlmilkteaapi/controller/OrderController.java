package com.fpt.hhtlmilkteaapi.controller;

import com.fpt.hhtlmilkteaapi.repository.IOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private IOrderRepository orderRepository;

    @GetMapping("/list")
    public ResponseEntity<?> getOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }
}
