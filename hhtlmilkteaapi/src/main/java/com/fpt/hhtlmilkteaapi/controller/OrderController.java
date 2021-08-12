package com.fpt.hhtlmilkteaapi.controller;

import com.fpt.hhtlmilkteaapi.entity.Order;
import com.fpt.hhtlmilkteaapi.entity.User;
import com.fpt.hhtlmilkteaapi.repository.IOrderRepository;
import com.fpt.hhtlmilkteaapi.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private IOrderRepository orderRepository;

    @Autowired
    private IUserRepository userRepository;

    @GetMapping("/list")
    public ResponseEntity<?> getOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    @GetMapping("/listProcess")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getListProcess(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam long id
    ) {

        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending()
        );

        Optional<User> user =  userRepository.findById(id);

        Page<Order> orders = orderRepository.findAllByUserIdEqualsAndStatusIn(user, Arrays.asList(1, 2), pageable);

        return ResponseEntity.ok(orders);
    }

    @GetMapping("/listSuccess")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getListSuccess(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam long id
    ) {

        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending()
        );

        Optional<User> user =  userRepository.findById(id);

        Page<Order> orders = orderRepository.findAllByUserIdEqualsAndStatusIn(user, Arrays.asList(3), pageable);

        return ResponseEntity.ok(orders);
    }

    @GetMapping("/listFail")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getListFail(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam long id
    ) {

        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending()
        );

        Optional<User> user =  userRepository.findById(id);

        Page<Order> orders = orderRepository.findAllByUserIdEqualsAndStatusIn(user, Arrays.asList(4), pageable);

        return ResponseEntity.ok(orders);
    }
}
