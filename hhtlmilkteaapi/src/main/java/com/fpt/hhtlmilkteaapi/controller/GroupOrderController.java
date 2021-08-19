package com.fpt.hhtlmilkteaapi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpt.hhtlmilkteaapi.entity.*;
import com.fpt.hhtlmilkteaapi.payload.request.WSGroupOrderRequest;
import com.fpt.hhtlmilkteaapi.payload.response.GroupOrderInfoResponse;
import com.fpt.hhtlmilkteaapi.payload.response.GroupOrderResponse;
import com.fpt.hhtlmilkteaapi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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
    private SimpMessagingTemplate template;

    /**
     * username: vanbich
     * type: team
     * */
    @GetMapping("/{username}/{type}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getGroupOderWithUsername(@PathVariable String username, @PathVariable String type) {

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
            List<Integer> quantities = new ArrayList<>();
            List<Product> products = new ArrayList<>();
            List<String> addOptionIds = new ArrayList<>();;
            List<String> sizeOptionIds = new ArrayList<>();;
            orderDetails.forEach(od -> {
                quantities.add(od.getQuantity());
                products.add(od.getProduct());
                addOptionIds.add(od.getAddOptionId());
                sizeOptionIds.add(od.getSizeOptionId());
            });


            // Total Price Current
            for(OrderDetail o : orderDetails) {
                totalPrice += o.getPriceCurrent();
            }

            // Group Order Info Response
            GroupOrderInfoResponse groupOrderInfoResponse = new GroupOrderInfoResponse();
            groupOrderInfoResponse.setUsername(user.getFullName());
            groupOrderInfoResponse.setQuantities(quantities);
            groupOrderInfoResponse.setProducts(products);
            groupOrderInfoResponse.setAddOptionIds(addOptionIds);
            groupOrderInfoResponse.setSizeOptionIds(sizeOptionIds);

            // Data of Owner
            groupOrderInfoResponses.add(groupOrderInfoResponse);

            // Data of GroupMember
            List<GroupMember> groupMembers = groupMemberRepository.findAllByUsernameOwner(username);
            for(GroupMember gm : groupMembers) {
                GroupOrderInfoResponse groupOrderInfoResponseMember = new GroupOrderInfoResponse();

                // Get All GroupOrderDetails
                List<GroupOrderDetails> groupOrderDetails = groupOrderDetailsRepository.findAllByGroupMember(gm);

                // Total Price Current
                for(GroupOrderDetails go : groupOrderDetails) {
                    totalPrice += go.getPriceCurrent();
                }

                List<Integer> quantitiesMember = new ArrayList<>();
                List<Product> productsMember = new ArrayList<>();
                List<String> addOptionIdsMember = new ArrayList<>();;
                List<String> sizeOptionIdsMember = new ArrayList<>();;
                groupOrderDetails.forEach(god -> {
                    quantitiesMember.add(god.getQuantity());
                    productsMember.add(god.getProduct());
                    addOptionIdsMember.add(god.getAddOptionId());
                    sizeOptionIdsMember.add(god.getSizeOptionId());
                });

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

//    @PostMapping("/GroupOderWithUsernameWS")
//    @PreAuthorize("permitAll()")
//    public ResponseEntity<?> getGroupOderWithUsernameWS(@RequestBody WSGroupOrderRequest wsGroupOrderRequest) {
//
//        List<GroupOrderInfoResponse> groupOrderInfoResponses = new ArrayList<>();
//        long totalPrice = 0;
//
//        // Check type to process
//        if("team".equals(wsGroupOrderRequest.getType())) {
//            User user = userRepository.findByUsername(wsGroupOrderRequest.getUsername()).get();
//            Order order = orderRepository.findByUserIdAndStatusAndTeam(user, 0, true).get();
//            List<OrderDetail> orderDetails = (List<OrderDetail>) order.getOrderDetails();
//            List<Integer> quantities = new ArrayList<>();
//            List<Product> products = new ArrayList<>();
//            List<String> addOptionIds = new ArrayList<>();;
//            List<String> sizeOptionIds = new ArrayList<>();;
//            orderDetails.forEach(od -> {
//                quantities.add(od.getQuantity());
//                products.add(od.getProduct());
//                addOptionIds.add(od.getAddOptionId());
//                sizeOptionIds.add(od.getSizeOptionId());
//            });
//
//
//            // Total Price Current
//            for(OrderDetail o : orderDetails) {
//                totalPrice += o.getPriceCurrent();
//            }
//
//            // Group Order Info Response
//            GroupOrderInfoResponse groupOrderInfoResponse = new GroupOrderInfoResponse();
//            groupOrderInfoResponse.setUsername(wsGroupOrderRequest.getUsername());
//            groupOrderInfoResponse.setQuantities(quantities);
//            groupOrderInfoResponse.setProducts(products);
//            groupOrderInfoResponse.setAddOptionIds(addOptionIds);
//            groupOrderInfoResponse.setSizeOptionIds(sizeOptionIds);
//
//            // Data of Owner
//            groupOrderInfoResponses.add(groupOrderInfoResponse);
//
//            // Data of GroupMember
//            List<GroupMember> groupMembers = groupMemberRepository.findAllByUsernameOwner(wsGroupOrderRequest.getUsername());
//            for(GroupMember gm : groupMembers) {
//                GroupOrderInfoResponse groupOrderInfoResponseMember = new GroupOrderInfoResponse();
//
//                // Get All GroupOrderDetails
//                List<GroupOrderDetails> groupOrderDetails = groupOrderDetailsRepository.findAllByGroupMember(gm);
//
//                // Total Price Current
//                for(GroupOrderDetails go : groupOrderDetails) {
//                    totalPrice += go.getPriceCurrent();
//                }
//
//                List<Integer> quantitiesMember = new ArrayList<>();
//                List<Product> productsMember = new ArrayList<>();
//                List<String> addOptionIdsMember = new ArrayList<>();;
//                List<String> sizeOptionIdsMember = new ArrayList<>();;
//                groupOrderDetails.forEach(god -> {
//                    quantitiesMember.add(god.getQuantity());
//                    productsMember.add(god.getProduct());
//                    addOptionIdsMember.add(god.getAddOptionId());
//                    sizeOptionIdsMember.add(god.getSizeOptionId());
//                });
//
//                groupOrderInfoResponseMember.setUsername(gm.getName());
//                groupOrderInfoResponseMember.setQuantities(quantitiesMember);
//                groupOrderInfoResponseMember.setProducts(productsMember);
//                groupOrderInfoResponseMember.setAddOptionIds(addOptionIdsMember);
//                groupOrderInfoResponseMember.setSizeOptionIds(sizeOptionIdsMember);
//
//                groupOrderInfoResponses.add(groupOrderInfoResponseMember);
//            }
//        }
//
//        // Result GroupOrder
//        GroupOrderResponse groupOrderResponse = new GroupOrderResponse();
//        groupOrderResponse.setGroupOrderInfoResponses(groupOrderInfoResponses);
//        groupOrderResponse.setTotalPriceGroup(totalPrice);
//
//        // Send data ws
//        ObjectMapper Obj = new ObjectMapper();
//        try {
//            String jsonStr = Obj.writeValueAsString(groupOrderResponse);
//            template.convertAndSend("/data", jsonStr);
//        }
//        catch (IOException e) {
//            e.printStackTrace();
//        }
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

}
