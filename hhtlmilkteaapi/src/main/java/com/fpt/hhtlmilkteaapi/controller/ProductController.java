package com.fpt.hhtlmilkteaapi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpt.hhtlmilkteaapi.entity.*;
import com.fpt.hhtlmilkteaapi.payload.request.ProducUpdatetRequest;
import com.fpt.hhtlmilkteaapi.payload.response.MessageResponse;
import com.fpt.hhtlmilkteaapi.payload.response.ProductRequest;
import com.fpt.hhtlmilkteaapi.repository.IProductRepository;
import com.fpt.hhtlmilkteaapi.service.CloudinaryService;
import org.springframework.beans.TypeMismatchException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private IProductRepository productRepository;

    private Map<String, String> options = new HashMap<>();

    @Value("${javadocfast.cloudinary.folder.image}")
    private String image;

    @Autowired
    private CloudinaryService cloudinaryService;

    @GetMapping("/list")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUsers(
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

        Page<Product> products = "".equals(keyword) ?
                productRepository.findAll(pageable) :
                productRepository.findProductsByNameLike("%" + keyword + "%", pageable);

        return ResponseEntity.ok(products);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addProduct(@ModelAttribute ProductRequest productRequest) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        SimpleDateFormat formatter = new SimpleDateFormat("ddMyyyyhhmmss");

        MultipartFile multipartFile = productRequest.getMultipartFile();
        if (multipartFile != null) {
            BufferedImage bufferedImage = ImageIO.read(multipartFile.getInputStream());
            if (bufferedImage == null) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Invalid image"));
            }
        }

        Map<String, String> options = new HashMap<>();
        options.put("folder", image);

        Map result = cloudinaryService.upload(multipartFile, options);
        String linkImg = result.get("url").toString();
        String nameImg = result.get("public_id").toString();

        String id = "P" + formatter.format(new Date());
        String name = productRequest.getName();
        String title = productRequest.getTitle();
        Long price = productRequest.getPrice();
        Category category = objectMapper.readValue(productRequest.getCategoryId().toString(), Category.class);
        Set<SizeOption> sizeOptions = new HashSet<>();
        if (productRequest.getSizeOptions() != null){
            for (int i = 0; i < productRequest.getSizeOptions().size() ; i ++){
                sizeOptions.add(objectMapper.readValue(productRequest.getSizeOptions().get(i).toString(), SizeOption.class));
            }
        }else{
            sizeOptions = null;
        }

        Set<AdditionOption> additionOptions = new HashSet<>();
        if (productRequest.getAdditionOptions() != null) {
            for (int i = 0; i < productRequest.getAdditionOptions().size(); i++) {
                additionOptions.add(objectMapper.readValue(productRequest.getAdditionOptions().get(i).toString(), AdditionOption.class));
            }
        }else{
            additionOptions = null;
        }

        Product product = new Product(id, name, title, linkImg, nameImg, price, category, sizeOptions, additionOptions);

        productRepository.save(product);

        return new ResponseEntity(product, HttpStatus.OK);
    }

    @PutMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateProduct(@ModelAttribute ProducUpdatetRequest productRequest) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();

        String id = productRequest.getId();

        Product product = productRepository.findById(id).get();

        Set<SizeOption> sizeOptions = new HashSet<>();
        if (productRequest.getSizeOptions() != null){
            for (int i = 0; i < productRequest.getSizeOptions().size() ; i ++){
                sizeOptions.add(objectMapper.readValue(productRequest.getSizeOptions().get(i).toString(), SizeOption.class));
            }
        }else{
            sizeOptions = null;
        }

        Set<AdditionOption> additionOptions = new HashSet<>();
        if (productRequest.getAdditionOptions() != null) {
            for (int i = 0; i < productRequest.getAdditionOptions().size(); i++) {
                additionOptions.add(objectMapper.readValue(productRequest.getAdditionOptions().get(i).toString(), AdditionOption.class));
            }
        }else{
            additionOptions = null;
        }

        product.setName(productRequest.getName());
        product.setTitle(productRequest.getTitle());
        product.setPrice(productRequest.getPrice());
        product.setSizeOptions(sizeOptions);
        product.setAdditionOptions(additionOptions);

        Category category = objectMapper.readValue(productRequest.getCategoryId().toString(), Category.class);
        product.setCategoryId(category);



        Map<String, String> options = new HashMap<>();
        options.put("folder", image);

        MultipartFile multipartFile = productRequest.getMultipartFile();
        if (multipartFile != null) {
            BufferedImage bufferedImage = ImageIO.read(multipartFile.getInputStream());
            if (bufferedImage == null) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Invalid image"));
            }

            Map result = cloudinaryService.upload(multipartFile, options);

            if (multipartFile != null) {
                String linkImg = result.get("url").toString();
                String nameImg = result.get("public_id").toString();
                product.setLinkImage(linkImg);
                product.setNameImage(nameImg);
            }
        }

        productRepository.save(product);

        return new ResponseEntity(product, HttpStatus.OK);
    }
}
