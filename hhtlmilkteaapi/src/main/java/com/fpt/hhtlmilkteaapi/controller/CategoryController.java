package com.fpt.hhtlmilkteaapi.controller;

import com.fpt.hhtlmilkteaapi.entity.Category;
import com.fpt.hhtlmilkteaapi.payload.response.MessageResponse;
import com.fpt.hhtlmilkteaapi.repository.ICategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private ICategoryRepository categoryRepository;

    @GetMapping("/list")
    public ResponseEntity<?> getCategories() {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    @GetMapping("/page")
    public ResponseEntity<?> getCategoriesPageList(
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

        Page<Category> categories = "".equals(keyword) ?
                categoryRepository.findAll(pageable) :
                categoryRepository.findCategoryByNameLike("%" + keyword + "%", pageable);
        return ResponseEntity.ok(categories);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addCategory(@RequestBody Category category) {
        return ResponseEntity.ok(categoryRepository.save(category));
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editCategory(@RequestBody Category category) {
        if (categoryRepository.existsById(category.getId())) {
            Category categoryUpdate = categoryRepository.findById(category.getId()).get();
            categoryUpdate.setName(category.getName());
            categoryRepository.save(categoryUpdate);
            return ResponseEntity.ok(categoryUpdate);
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Category is not exist..."));
        }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> deleteCategoryById(@PathVariable Long id) {
        Category category = categoryRepository.findById(id).get();
        if (category.getDeletedAt() == null) {
            category.setDeletedAt(new Date());
        } else {
            category.setDeletedAt(null);
        }
        categoryRepository.save(category);
        return new ResponseEntity(category, HttpStatus.OK);
    }
}
