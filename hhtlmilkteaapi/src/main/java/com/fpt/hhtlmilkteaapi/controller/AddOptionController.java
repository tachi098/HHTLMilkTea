package com.fpt.hhtlmilkteaapi.controller;

import com.fpt.hhtlmilkteaapi.entity.AdditionOption;
import com.fpt.hhtlmilkteaapi.payload.response.MessageResponse;
import com.fpt.hhtlmilkteaapi.repository.IAddOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/additionoption")
public class AddOptionController {

    @Autowired
    private IAddOptionRepository addOptionRepository;

    @GetMapping("/list")
    public ResponseEntity<?> getAdditionOptions() {
        return ResponseEntity.ok(addOptionRepository.findAll());
    }

    @GetMapping("/page")
    public ResponseEntity<?> getAdditionOptionsPageList(
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

        Page<AdditionOption> additionOptions = "".equals(keyword) ?
                addOptionRepository.findAll(pageable) :
                addOptionRepository.findAdditionByNameLike("%" + keyword + "%", pageable);
        return ResponseEntity.ok(additionOptions);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addAdditionOptions(@RequestBody AdditionOption additionOption) {
        return ResponseEntity.ok(addOptionRepository.save(additionOption));
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editAdditionOptions(@RequestBody AdditionOption additionOption) {
        if (addOptionRepository.existsById(additionOption.getId())) {
            AdditionOption additionOptionUpdate = addOptionRepository.findById(additionOption.getId()).get();
            additionOptionUpdate.setName(additionOption.getName());
            additionOptionUpdate.setPrice(additionOption.getPrice());
            addOptionRepository.save(additionOptionUpdate);
            return ResponseEntity.ok(additionOptionUpdate);
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Addition Options is not exist..."));
        }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> deleteAdditionOptionsById(@PathVariable Long id) {
        AdditionOption additionOption = addOptionRepository.findById(id).get();
        if (additionOption.getDeletedAt() == null) {
            additionOption.setDeletedAt(new Date());
        } else {
            additionOption.setDeletedAt(null);
        }
        addOptionRepository.save(additionOption);
        return new ResponseEntity(additionOption, HttpStatus.OK);
    }
}
