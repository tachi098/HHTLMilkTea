package com.fpt.hhtlmilkteaapi.controller;

import com.fpt.hhtlmilkteaapi.entity.Order;
import com.fpt.hhtlmilkteaapi.repository.IOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/order/chatbot")
public class ChatBotController {

    @Autowired
    private IOrderRepository orderRepository;

    @GetMapping("/getOrder")
    public ResponseEntity<?> getOrderChatBot(@RequestParam String orderId) {
        Order order = null;
        if(orderRepository.existsById(orderId)){
            order = orderRepository.findById(orderId).get();
        }
        return ResponseEntity.ok(order);
    }

}
