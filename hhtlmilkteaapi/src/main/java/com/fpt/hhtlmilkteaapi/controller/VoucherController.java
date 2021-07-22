package com.fpt.hhtlmilkteaapi.controller;

import com.fpt.hhtlmilkteaapi.repository.ICodeRepository;
import com.fpt.hhtlmilkteaapi.repository.IVoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/voucher")
public class VoucherController {

    @Autowired
    private IVoucherRepository voucherRepository;

    @GetMapping("/list")
    public ResponseEntity<?> getCodes() {
        return ResponseEntity.ok(voucherRepository.findAll());
    }
}
