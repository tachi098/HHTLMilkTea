package com.fpt.hhtlmilkteaapi.controller;

import com.fpt.hhtlmilkteaapi.repository.IMemberVipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/membervip")
public class MemberVipController {

    @Autowired
    private IMemberVipRepository memberVipRepository;

    @GetMapping("/list")
    public ResponseEntity<?> getMemberVips() {
        return ResponseEntity.ok(memberVipRepository.findAll());
    }

}
