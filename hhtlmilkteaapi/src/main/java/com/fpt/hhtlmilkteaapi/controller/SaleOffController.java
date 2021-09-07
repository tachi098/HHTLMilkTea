package com.fpt.hhtlmilkteaapi.controller;

import com.fpt.hhtlmilkteaapi.entity.Product;
import com.fpt.hhtlmilkteaapi.entity.SaleOff;
import com.fpt.hhtlmilkteaapi.payload.request.SaleOffRequest;
import com.fpt.hhtlmilkteaapi.repository.IProductRepository;
import com.fpt.hhtlmilkteaapi.repository.ISaleOffRepository;
import com.fpt.hhtlmilkteaapi.repository.ISizeOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/saleoff")
public class SaleOffController {

    @Autowired
    private ISaleOffRepository saleOffRepository;

    @Autowired
    private IProductRepository productRepository;

    @GetMapping("/list")
    public ResponseEntity<?> getSaleOffs(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).descending() : Sort.by(sortField).ascending()
        );

        Date date = new Date();
        Timestamp timeNow = new Timestamp(date.getTime());

        List<SaleOff> saleOffs = saleOffRepository.findAll();

        for (SaleOff saleOff : saleOffs) {
            if (saleOff.getEndDate().compareTo(timeNow) < 0) {
                saleOffRepository.delete(saleOff);
            }
        }

        return ResponseEntity.ok(saleOffRepository.findAll(pageable));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addSaleOff(@RequestBody SaleOffRequest saleOffRequest) {
        Product product = productRepository.findById(saleOffRequest.getProductId()).get();

        Double discount = saleOffRequest.getDiscount();
        Date endDate = saleOffRequest.getEndDate();

        SaleOff saleOff = new SaleOff(discount, endDate, product);

        saleOffRepository.save(saleOff);

        return ResponseEntity.ok(saleOff);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSaleOff(@PathVariable Long id,
                                           @RequestParam(defaultValue = "1") int page,
                                           @RequestParam(defaultValue = "3") int pageSize,
                                           @RequestParam(defaultValue = "id") String sortField,
                                           @RequestParam(defaultValue = "asc") String sortDir) {

        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).descending() : Sort.by(sortField).ascending()
        );


        SaleOff saleOff = saleOffRepository.findById(id).get();
        saleOffRepository.delete(saleOff);

        return ResponseEntity.ok(productRepository.findProductBySaleOffNotNull(pageable));
    }
}
