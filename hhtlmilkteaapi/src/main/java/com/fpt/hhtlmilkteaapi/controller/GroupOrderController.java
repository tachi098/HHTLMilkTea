package com.fpt.hhtlmilkteaapi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpt.hhtlmilkteaapi.entity.*;
import com.fpt.hhtlmilkteaapi.payload.request.WSGroupOrderRequest;
import com.fpt.hhtlmilkteaapi.payload.response.GroupOrderInfoResponse;
import com.fpt.hhtlmilkteaapi.payload.response.GroupOrderResponse;
import com.fpt.hhtlmilkteaapi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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
     * */
    @GetMapping("/{username}/{type}/{orderID}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getGroupOderWithUsername(@PathVariable String username, @PathVariable String type,
                                                      @PathVariable String orderID) {

        List<GroupOrderInfoResponse> groupOrderInfoResponses = new ArrayList<>();
        long totalPrice = 0;

        // Check type to process
        if("team".equals(type)) {
            if(!userRepository.findByUsername(username).isPresent()) {
                return ResponseEntity.ok(new GroupOrderResponse());
            }
            User user = userRepository.findByUsername(username).get();
            if(!orderRepository.findByUserIdAndStatusAndTeam(user, 0, true).isPresent()) {
                return ResponseEntity.ok(new GroupOrderResponse());
            }
            Order order = orderRepository.findByUserIdAndStatusAndTeam(user, 0, true).get();
            List<OrderDetail> orderDetails = (List<OrderDetail>) order.getOrderDetails();
            List<Long> orderDetailsID = new ArrayList<>();
            List<Integer> quantities = new ArrayList<>();
            List<Product> products = new ArrayList<>();
            List<String> addOptionIds = new ArrayList<>();;
            List<String> sizeOptionIds = new ArrayList<>();;
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
            for(OrderDetail o : orderDetails) {
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
            for(GroupMember gm : groupMembers) {
                GroupOrderInfoResponse groupOrderInfoResponseMember = new GroupOrderInfoResponse();

                // Get All GroupOrderDetails
                List<GroupOrderDetails> groupOrderDetails = groupOrderDetailsRepository.findAllByGroupMember(gm);

                // Total Price Current
                for(GroupOrderDetails go : groupOrderDetails) {
                    totalPrice += go.getPriceCurrent() +  go.getPriceCurrent();
                }

                List<Long> orderDetailsIDMember = new ArrayList<>();
                List<Integer> quantitiesMember = new ArrayList<>();
                List<Product> productsMember = new ArrayList<>();
                List<String> addOptionIdsMember = new ArrayList<>();;
                List<String> sizeOptionIdsMember = new ArrayList<>();;
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

        // Send data ws
        ObjectMapper Obj = new ObjectMapper();

        if("logout".equals(wsGroupOrderRequest.getUsername()) &&
                "logout".equals(wsGroupOrderRequest.getType()) &&
                "logout".equals(wsGroupOrderRequest.getOrderID())) {
            try {
                String jsonStr = Obj.writeValueAsString(new GroupOrderResponse());
                template.convertAndSend("/data", jsonStr);
            }
            catch (IOException e) {
                e.printStackTrace();
            }

            return ResponseEntity.ok(HttpStatus.OK);
        }

        List<GroupOrderInfoResponse> groupOrderInfoResponses = new ArrayList<>();
        long totalPrice = 0;

        // Check type to process
        if("team".equals(wsGroupOrderRequest.getType())) {
            if(!userRepository.findByUsername(wsGroupOrderRequest.getUsername()).isPresent()) {
                return ResponseEntity.ok(new GroupOrderResponse());
            }
            User user = userRepository.findByUsername(wsGroupOrderRequest.getUsername()).get();
            if(!orderRepository.findByUserIdAndStatusAndTeam(user, 0, true).isPresent()) {
                return ResponseEntity.ok(new GroupOrderResponse());
            }
            Order order = orderRepository.findByUserIdAndStatusAndTeam(user, 0, true).get();
            List<OrderDetail> orderDetails = (List<OrderDetail>) order.getOrderDetails();
            List<Long> orderDetailsID = new ArrayList<>();
            List<Integer> quantities = new ArrayList<>();
            List<Product> products = new ArrayList<>();
            List<String> addOptionIds = new ArrayList<>();;
            List<String> sizeOptionIds = new ArrayList<>();;
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
            for(OrderDetail o : orderDetails) {
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
            List<GroupMember> groupMembers = groupMemberRepository.findAllByUsernameOwnerAndOrder(wsGroupOrderRequest.getUsername(), orderRepository.findByUserIdAndStatusAndTeam(user, 0, true).get());
            for(GroupMember gm : groupMembers) {
                GroupOrderInfoResponse groupOrderInfoResponseMember = new GroupOrderInfoResponse();

                // Get All GroupOrderDetails
                List<GroupOrderDetails> groupOrderDetails = groupOrderDetailsRepository.findAllByGroupMember(gm);

                // Total Price Current
                for(GroupOrderDetails go : groupOrderDetails) {
                    totalPrice += go.getQuantity() * go.getPriceCurrent();
                }

                List<Long> orderDetailsIDMember = new ArrayList<>();
                List<Integer> quantitiesMember = new ArrayList<>();
                List<Product> productsMember = new ArrayList<>();
                List<String> addOptionIdsMember = new ArrayList<>();;
                List<String> sizeOptionIdsMember = new ArrayList<>();;
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
            template.convertAndSend("/data", jsonStr);
        }
        catch (IOException e) {
            e.printStackTrace();
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

        if(shorterRepository.existsByShortUrl(url)) {
            Shorter shorter = shorterRepository.findShorterMappingsByShortUrl(url);
            shorterRepository.delete(shorter);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
