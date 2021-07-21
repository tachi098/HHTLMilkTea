package com.fpt.hhtlmilkteaapi.controller;

import com.fpt.hhtlmilkteaapi.repository.ISaleOffRepository;
import com.fpt.hhtlmilkteaapi.repository.ISizeOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/saleoffs")
public class SaleOffController {

    @Autowired
    private ISaleOffRepository saleOffRepository;

    @GetMapping("/list")
    public ResponseEntity<?> getSaleOffs() {
        return ResponseEntity.ok(saleOffRepository.findAll());
    }
}
