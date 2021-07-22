package com.fpt.hhtlmilkteaapi.controller;

import com.fpt.hhtlmilkteaapi.repository.ISpinnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/spinner")
public class SpinnerController {

    @Autowired
    private ISpinnerRepository spinnerRepository;

    @GetMapping("/list")
    public ResponseEntity<?> getCodes() {
        return ResponseEntity.ok(spinnerRepository.findAll());
    }
}
