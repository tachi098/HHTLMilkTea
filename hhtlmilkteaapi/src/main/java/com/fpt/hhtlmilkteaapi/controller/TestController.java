package com.fpt.hhtlmilkteaapi.controller;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/all")
    public String allAccess() {
        return "Public Content.";
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public String userAccess() {
        return "User Content.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "Admin Board.";
    }

    @Autowired
    SimpMessagingTemplate template;

    @PostMapping("/send1")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Void> sendMessageTest01() {
        Gson gson = new Gson();
        List<String> list = Arrays.asList("1");

        template.convertAndSend("/message", gson.toJson(list));

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/send2")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Void> sendMessageTest02() {
        Gson gson = new Gson();
        List<String> list = Arrays.asList("1", "2", "3", "4", "5");

        template.convertAndSend("/message", gson.toJson(list));

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
