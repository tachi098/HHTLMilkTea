package com.fpt.hhtlmilkteaapi.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpt.hhtlmilkteaapi.entity.*;
import com.fpt.hhtlmilkteaapi.payload.request.OrderRequest;
import com.fpt.hhtlmilkteaapi.payload.response.CartResponse;
import com.fpt.hhtlmilkteaapi.repository.IOrderDetailRepository;
import com.fpt.hhtlmilkteaapi.repository.IOrderRepository;
import com.fpt.hhtlmilkteaapi.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import javax.websocket.server.PathParam;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.List;
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


    @Autowired
    private IOrderDetailRepository orderDetailRepository;


    @GetMapping("/list")
    public ResponseEntity<?> getOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getOrder(@PathVariable long id) {
        CartResponse cartResponse = new CartResponse();

        Order order = orderRepository.findOrderByUserId_IdAndStatusLike(id, 0);
        if (order != null){
            int sum = 0;
            for(OrderDetail orderDetailnew: order.getOrderDetails()){
                sum += orderDetailnew.getQuantity();
            }
            cartResponse.setOrder(order);
            cartResponse.setQuantity(sum);
        }
        return ResponseEntity.ok(cartResponse);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> addOrder(@RequestBody OrderRequest orderRequest) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();
        SimpleDateFormat formatter = new SimpleDateFormat("ddMyyyyhhmmss");

        CartResponse cartResponse = new CartResponse();

        long id = orderRequest.getUserId();

        Order order = orderRepository.findOrderByUserId_IdAndStatusLike(id, 0);

        User user = userRepository.findById(id).get();
        Product product = objectMapper.readValue(orderRequest.getProduct().toString(), Product.class);
        String note = orderRequest.getNote();
        String size = orderRequest.getSizeOption();
        String add = orderRequest.getAdditionOption();
        int quantity = orderRequest.getQuantity();
        long currenPrice = orderRequest.getPriceCurrent();

        // Kiểm tra oder
        Order orderNew;
        if (order != null) {
            orderNew = order;
        } else {
            String orderId = "P" + formatter.format(new Date());
            orderNew = new Order(orderId, null, null, 0, 0, null, 0, user, 0);
            orderRepository.save(orderNew);
        }

        //Tạo OrderDetail
        //Check neu orderdetail co product, add, size giong nhau thi cong quantity

        if (orderNew.getOrderDetails() != null) {

            OrderDetail orderDetail = orderDetailRepository.findByOrderId_IdAndProduct_IdAndAddOptionIdLikeAndSizeOptionIdLike(orderNew.getId(), product.getId(), add, size);

            if (orderDetail != null) {
                orderDetail.setQuantity(orderDetail.getQuantity() + quantity);
                orderDetail.setNoteProduct(note);
                orderDetailRepository.save(orderDetail);
                orderNew.setOrderDetails(orderDetailRepository.findByOrderId_Id(orderNew.getId()));
                orderRepository.save(orderNew);

                int sum = 0;
                for (OrderDetail orderDetailnew : orderNew.getOrderDetails()) {
                    sum += orderDetailnew.getQuantity();
                }
                cartResponse.setOrder(orderNew);
                cartResponse.setQuantity(sum);
            } else {
                OrderDetail orderDetailNew = new OrderDetail(size, add, quantity, currenPrice,
                        note, orderNew, product);
                orderDetailRepository.save(orderDetailNew);
                orderNew.setOrderDetails(orderDetailRepository.findByOrderId_Id(orderNew.getId()));
                orderRepository.save(orderNew);

                int sum = 0;
                for (OrderDetail orderDetailnew : orderNew.getOrderDetails()) {
                    sum += orderDetailnew.getQuantity();
                }
                cartResponse.setOrder(orderNew);
                cartResponse.setQuantity(sum);
            }
            return ResponseEntity.ok(cartResponse);
        } else {
            OrderDetail orderDetailNew = new OrderDetail(size, add, quantity, currenPrice,
                    note, orderNew, product);
            orderDetailRepository.save(orderDetailNew);

            orderNew.setOrderDetails(orderDetailRepository.findByOrderId_Id(orderNew.getId()));
            orderRepository.save(orderNew);

            int sum = 0;
            for (OrderDetail orderDetail : orderNew.getOrderDetails()) {
                sum += orderDetail.getQuantity();
            }
            cartResponse.setOrder(orderNew);
            cartResponse.setQuantity(sum);
            return ResponseEntity.ok(cartResponse);
        }
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
