package com.fpt.hhtlmilkteaapi.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpt.hhtlmilkteaapi.entity.*;
import com.fpt.hhtlmilkteaapi.payload.request.GroupMemberRequest;
import com.fpt.hhtlmilkteaapi.payload.request.OrderQuantityRequest;
import com.fpt.hhtlmilkteaapi.payload.request.WSGroupOrderRequest;
import com.fpt.hhtlmilkteaapi.payload.response.CartResponse;
import com.fpt.hhtlmilkteaapi.payload.response.GroupOrderInfoResponse;
import com.fpt.hhtlmilkteaapi.payload.response.GroupOrderResponse;
import com.fpt.hhtlmilkteaapi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/grouporder")
public class GroupOrderController {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IOrderRepository orderRepository;

    @Autowired
    private IGroupMemberRepository groupMemberRepository;

    @Autowired
    private IGroupOrderDetailsRepository groupOrderDetailsRepository;

    @Autowired
    private IShorterRepository shorterRepository;

    @Autowired
    private SimpMessagingTemplate template;

    /**
     * username: vanbich
     * type: team
     * orderID: of owner
     */
    @GetMapping("/{username}/{type}/{orderID}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getGroupOderWithUsername(@PathVariable String username, @PathVariable String type,
                                                      @PathVariable String orderID) {


        List<GroupOrderInfoResponse> groupOrderInfoResponses = new ArrayList<>();
        long totalPrice = 0;

        // Check type to process
        if ("team".equals(type)) {
            if (!userRepository.findByUsername(username).isPresent()) {
                return ResponseEntity.ok(new GroupOrderResponse());
            }
            User user = userRepository.findByUsername(username).get();
            if (!orderRepository.findByUserIdAndStatusAndTeam(user, 0, true).isPresent()) {
                return ResponseEntity.ok(new GroupOrderResponse());
            }
            Order order = orderRepository.findByUserIdAndStatusAndTeam(user, 0, true).get();
            List<OrderDetail> orderDetails = (List<OrderDetail>) order.getOrderDetails();
            List<Long> orderDetailsID = new ArrayList<>();
            List<Integer> quantities = new ArrayList<>();
            List<Product> products = new ArrayList<>();
            List<String> addOptionIds = new ArrayList<>();
            List<String> sizeOptionIds = new ArrayList<>();

            orderDetails.forEach(od -> {
                orderDetailsID.add(od.getId());

                quantities.add(od.getQuantity());

                Product product = od.getProduct();
                product.setPrice(od.getPriceCurrent());
                products.add(product);

                addOptionIds.add(od.getAddOptionId());
                sizeOptionIds.add(od.getSizeOptionId());
            });


            // Total Price Current
            for (OrderDetail o : orderDetails) {
                totalPrice += o.getQuantity() * o.getPriceCurrent();
            }

            // Group Order Info Response
            GroupOrderInfoResponse groupOrderInfoResponse = new GroupOrderInfoResponse();
            groupOrderInfoResponse.setOrderDetailsID(orderDetailsID);
            groupOrderInfoResponse.setUsername(user.getFullName());
            groupOrderInfoResponse.setQuantities(quantities);
            groupOrderInfoResponse.setProducts(products);
            groupOrderInfoResponse.setAddOptionIds(addOptionIds);
            groupOrderInfoResponse.setSizeOptionIds(sizeOptionIds);

            // Data of Owner
            groupOrderInfoResponses.add(groupOrderInfoResponse);

            // Data of GroupMember
            List<GroupMember> groupMembers = groupMemberRepository.findAllByUsernameOwnerAndOrder(username, orderRepository.findByUserIdAndStatusAndTeam(user, 0, true).get());
            for (GroupMember gm : groupMembers) {
                GroupOrderInfoResponse groupOrderInfoResponseMember = new GroupOrderInfoResponse();

                // Get All GroupOrderDetails
                List<GroupOrderDetails> groupOrderDetails = groupOrderDetailsRepository.findAllByGroupMember(gm);

                // Total Price Current
                for (GroupOrderDetails go : groupOrderDetails) {
                    totalPrice += go.getPriceCurrent() + go.getPriceCurrent();
                }

                List<Long> orderDetailsIDMember = new ArrayList<>();
                List<Integer> quantitiesMember = new ArrayList<>();
                List<Product> productsMember = new ArrayList<>();
                List<String> addOptionIdsMember = new ArrayList<>();
                ;
                List<String> sizeOptionIdsMember = new ArrayList<>();
                ;
                groupOrderDetails.forEach(god -> {
                    orderDetailsIDMember.add(god.getId());

                    quantitiesMember.add(god.getQuantity());

                    Product productMember = god.getProduct();
                    productMember.setPrice(god.getPriceCurrent());
                    productsMember.add(productMember);

                    addOptionIdsMember.add(god.getAddOptionId());
                    sizeOptionIdsMember.add(god.getSizeOptionId());
                });

                groupOrderInfoResponseMember.setOrderDetailsID(orderDetailsIDMember);
                groupOrderInfoResponseMember.setUsername(gm.getName());
                groupOrderInfoResponseMember.setQuantities(quantitiesMember);
                groupOrderInfoResponseMember.setProducts(productsMember);
                groupOrderInfoResponseMember.setAddOptionIds(addOptionIdsMember);
                groupOrderInfoResponseMember.setSizeOptionIds(sizeOptionIdsMember);

                groupOrderInfoResponses.add(groupOrderInfoResponseMember);
            }
        }

        // Result GroupOrder
        GroupOrderResponse groupOrderResponse = new GroupOrderResponse();
        groupOrderResponse.setGroupOrderInfoResponses(groupOrderInfoResponses);
        groupOrderResponse.setTotalPriceGroup(totalPrice);

        return ResponseEntity.ok(groupOrderResponse);
    }

    @PostMapping("/GroupOderWithUsernameWS")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getGroupOderWithUsernameWS(@RequestBody WSGroupOrderRequest wsGroupOrderRequest) {
        try {
            // Send data ws
            ObjectMapper Obj = new ObjectMapper();

            if ("logout".equals(wsGroupOrderRequest.getUsername()) &&
                    "logout".equals(wsGroupOrderRequest.getType()) &&
                    "logout".equals(wsGroupOrderRequest.getOrderID())) {
                try {
                    String jsonStr = Obj.writeValueAsString(new GroupOrderResponse());
                    template.convertAndSend(wsGroupOrderRequest.getUsername() + "/data", jsonStr);
                } catch (IOException e) {
                    e.printStackTrace();
                }

                return ResponseEntity.ok(HttpStatus.OK);
            }

            List<GroupOrderInfoResponse> groupOrderInfoResponses = new ArrayList<>();
            long totalPrice = 0;

            // Check type to process
            if ("team".equals(wsGroupOrderRequest.getType())) {
                if (!userRepository.findByUsername(wsGroupOrderRequest.getUsername()).isPresent()) {
                    try {
                        String jsonStr = Obj.writeValueAsString(new GroupOrderResponse());
                        template.convertAndSend(wsGroupOrderRequest.getUsername() + "/data", jsonStr);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    return ResponseEntity.ok(HttpStatus.OK);
                }
                User user = userRepository.findByUsername(wsGroupOrderRequest.getUsername()).get();
                if (!orderRepository.findByUserIdAndStatusAndTeam(user, 0, true).isPresent()) {
                    try {
                        String jsonStr = Obj.writeValueAsString(new GroupOrderResponse());
                        template.convertAndSend(wsGroupOrderRequest.getUsername() + "/data", jsonStr);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    return ResponseEntity.ok(HttpStatus.OK);
                }

                Order order = orderRepository.findByUserIdAndStatusAndTeam(user, 0, true).get();
                List<OrderDetail> orderDetails = (List<OrderDetail>) order.getOrderDetails();
                List<Long> orderDetailsID = new ArrayList<>();
                List<Integer> quantities = new ArrayList<>();
                List<Product> products = new ArrayList<>();
                List<String> addOptionIds = new ArrayList<>();
                ;
                List<String> sizeOptionIds = new ArrayList<>();
                ;
                orderDetails.forEach(od -> {
                    orderDetailsID.add(od.getId());

                    quantities.add(od.getQuantity());

                    Product product = od.getProduct();
                    product.setPrice(od.getPriceCurrent());
                    products.add(product);

                    addOptionIds.add(od.getAddOptionId());
                    sizeOptionIds.add(od.getSizeOptionId());
                });


                // Total Price Current
                for (OrderDetail o : orderDetails) {
                    totalPrice += o.getQuantity() * o.getPriceCurrent();
                }

                // Group Order Info Response
                GroupOrderInfoResponse groupOrderInfoResponse = new GroupOrderInfoResponse();
                groupOrderInfoResponse.setOrderDetailsID(orderDetailsID);
                groupOrderInfoResponse.setUsername(user.getFullName());
                groupOrderInfoResponse.setQuantities(quantities);
                groupOrderInfoResponse.setProducts(products);
                groupOrderInfoResponse.setAddOptionIds(addOptionIds);
                groupOrderInfoResponse.setSizeOptionIds(sizeOptionIds);

                // Data of Owner
                groupOrderInfoResponses.add(groupOrderInfoResponse);

                // Data of GroupMember
                List<GroupMember> groupMembers = groupMemberRepository
                        .findAllByUsernameOwnerAndOrder(wsGroupOrderRequest.getUsername(), orderRepository.findByUserIdAndStatusAndTeam(user, 0, true).get());
                for (GroupMember gm : groupMembers) {
                    GroupOrderInfoResponse groupOrderInfoResponseMember = new GroupOrderInfoResponse();

                    // Get All GroupOrderDetails
                    List<GroupOrderDetails> groupOrderDetails = groupOrderDetailsRepository.findAllByGroupMember(gm);

                    // Total Price Current
                    for (GroupOrderDetails go : groupOrderDetails) {
                        totalPrice += go.getQuantity() * go.getPriceCurrent();
                    }

                    List<Long> orderDetailsIDMember = new ArrayList<>();
                    List<Integer> quantitiesMember = new ArrayList<>();
                    List<Product> productsMember = new ArrayList<>();
                    List<String> addOptionIdsMember = new ArrayList<>();
                    ;
                    List<String> sizeOptionIdsMember = new ArrayList<>();
                    ;
                    groupOrderDetails.forEach(god -> {
                        orderDetailsIDMember.add(god.getId());

                        quantitiesMember.add(god.getQuantity());

                        Product productMember = god.getProduct();
                        productMember.setPrice(god.getPriceCurrent());
                        productsMember.add(productMember);

                        addOptionIdsMember.add(god.getAddOptionId());
                        sizeOptionIdsMember.add(god.getSizeOptionId());
                    });

                    groupOrderInfoResponseMember.setOrderDetailsID(orderDetailsIDMember);
                    groupOrderInfoResponseMember.setUsername(gm.getName());
                    groupOrderInfoResponseMember.setQuantities(quantitiesMember);
                    groupOrderInfoResponseMember.setProducts(productsMember);
                    groupOrderInfoResponseMember.setAddOptionIds(addOptionIdsMember);
                    groupOrderInfoResponseMember.setSizeOptionIds(sizeOptionIdsMember);

                    groupOrderInfoResponses.add(groupOrderInfoResponseMember);
                }
            }

            // Result GroupOrder
            GroupOrderResponse groupOrderResponse = new GroupOrderResponse();
            groupOrderResponse.setGroupOrderInfoResponses(groupOrderInfoResponses);
            groupOrderResponse.setTotalPriceGroup(totalPrice);


            try {
                String jsonStr = Obj.writeValueAsString(groupOrderResponse);
                template.convertAndSend(wsGroupOrderRequest.getUsername() + "/data", jsonStr);
            } catch (IOException e) {
                e.printStackTrace();
            }
        } catch (Exception ex) {

        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{namemenber}/{nameOwner}/{orderID}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteMember(@PathVariable String namemenber, @PathVariable String nameOwner, @PathVariable String orderID) {

        User user = userRepository.findByUsername(nameOwner).get();
        Order order = orderRepository.findByUserIdAndStatusAndTeam(user, 0, true).get();
        GroupMember member = groupMemberRepository.findByNameAndUsernameOwnerAndOrder(namemenber, nameOwner, order).get();
        groupMemberRepository.delete(member);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{usernameOwner}/{orderId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteMembers(@PathVariable String usernameOwner, @PathVariable String orderId) {

        User user = userRepository.findByUsername(usernameOwner).get();
        Order order = orderRepository.findByUserIdAndStatusAndTeam(user, 0, true).get();
        List<GroupMember> groupMembers = groupMemberRepository.findAllByUsernameOwnerAndOrder(usernameOwner, order);
        groupMemberRepository.deleteAll(groupMembers);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{longUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteLongUrl(@PathVariable String longUrl) {

        String url = "localhost:8080/shared/" + longUrl;

        if (shorterRepository.existsByShortUrl(url)) {
            Shorter shorter = shorterRepository.findShorterMappingsByShortUrl(url);
            shorterRepository.delete(shorter);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping("/create-member")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> createGroupMember(@RequestBody GroupMemberRequest groupMemberRequest) {

        User user = userRepository.findByUsername(groupMemberRequest.getUsernameOwner()).get();
        Order order = orderRepository.findByUserIdAndStatusAndTeam(user, 0, true).get();
        if (groupMemberRepository.findByNameAndUsernameOwnerAndOrder(groupMemberRequest.getName(),
                groupMemberRequest.getUsernameOwner(), order).isPresent()) {
            return ResponseEntity.ok("Tên này đã được sử dụng");
        }

        GroupMember groupMember = new GroupMember();
        groupMember.setName(groupMemberRequest.getName());
        groupMember.setUsernameOwner(groupMemberRequest.getUsernameOwner());
        groupMember.setOrder(order);

        return ResponseEntity.ok(groupMemberRepository.save(groupMember));
    }


    @PostMapping("/create-orderDetails")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> orderForGroupMember(@RequestBody GroupMemberRequest groupMemberRequest) throws JsonProcessingException {

        User user = userRepository.findByUsername(groupMemberRequest.getUsernameOwner()).get();
        Order order = orderRepository.findByUserIdAndStatusAndTeam(user, 0, true).get();
        GroupMember groupMember = groupMemberRepository.findByNameAndUsernameOwnerAndOrder(groupMemberRequest.getName(),
                groupMemberRequest.getUsernameOwner(), order).get();

        ObjectMapper objectMapper = new ObjectMapper();
        Product product = objectMapper.readValue(groupMemberRequest.getProduct().toString(), Product.class);
        String note = groupMemberRequest.getNote();
        String size = groupMemberRequest.getSizeOption();
        String add = groupMemberRequest.getAdditionOption();
        int quantity = groupMemberRequest.getQuantity();
        long currenPrice = groupMemberRequest.getPriceCurrent();


        if (groupMember.getGroupOrderDetails() != null) {

            GroupOrderDetails groupOrderDetails = groupOrderDetailsRepository.findByGroupMemberAndProductAndAddOptionIdLikeAndSizeOptionIdLike(groupMember, product, add, size);

            if (groupOrderDetails != null) {
                groupOrderDetails.setQuantity(groupOrderDetails.getQuantity() + quantity);
                groupOrderDetails.setNoteProduct(note);
                groupOrderDetailsRepository.save(groupOrderDetails);
            } else {
                GroupOrderDetails groupOrderDetailsNew = new GroupOrderDetails(size, add, quantity, currenPrice,
                        note, groupMember, product);
                groupOrderDetailsRepository.save(groupOrderDetailsNew);
            }
            groupMember.setGroupOrderDetails(groupOrderDetailsRepository.findAllByGroupMember(groupMember));
            groupMemberRepository.save(groupMember);
            return ResponseEntity.ok(groupMemberRepository.save(groupMember));
        } else {
            GroupOrderDetails groupOrderDetailsNew = new GroupOrderDetails(size, add, quantity, currenPrice,
                    note, groupMember, product);
            groupOrderDetailsRepository.save(groupOrderDetailsNew);
            groupMember.setGroupOrderDetails(groupOrderDetailsRepository.findAllByGroupMember(groupMember));
            groupMemberRepository.save(groupMember);
            return ResponseEntity.ok(groupMemberRepository.save(groupMember));
        }

    }


    @PutMapping("/update-orderDetails-quantity")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> updateQuantity(
            @RequestBody GroupMemberRequest groupMemberRequest
    ) {

        GroupOrderDetails groupOrderDetails = groupOrderDetailsRepository
                .findById(groupMemberRequest.getGroupOrderDetailId()).get();

        if (groupMemberRequest.getAction().equals("plus")) {
            groupOrderDetails.setQuantity(groupOrderDetails.getQuantity() + 1);
        } else {
            groupOrderDetails.setQuantity(groupOrderDetails.getQuantity() - 1);
        }

        groupOrderDetailsRepository.save(groupOrderDetails);

        return ResponseEntity.ok("");
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> deleteGroupOrderDetails(@PathVariable long id) {

        GroupOrderDetails groupOrderDetails = groupOrderDetailsRepository.findById(id).get();
        groupOrderDetailsRepository.delete(groupOrderDetails);

        return ResponseEntity.ok("");
    }

}
