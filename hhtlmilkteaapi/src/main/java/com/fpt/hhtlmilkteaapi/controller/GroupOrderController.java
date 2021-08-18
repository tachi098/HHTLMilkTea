package com.fpt.hhtlmilkteaapi.controller;

import com.fpt.hhtlmilkteaapi.entity.*;
import com.fpt.hhtlmilkteaapi.payload.response.GroupOrderInfoResponse;
import com.fpt.hhtlmilkteaapi.payload.response.GroupOrderResponse;
import com.fpt.hhtlmilkteaapi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

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

    /**
     * username: vanbich
     * type: team
     * namemember: hoaipx
     * */
    @GetMapping("/{username}/{type}/{namemember}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getGroupOderWithUsername(@PathVariable String username, @PathVariable String type,
                                                      @PathVariable String namemember) {

        List<GroupOrderInfoResponse> groupOrderInfoResponses = new ArrayList<>();
        long totalPrice = 0;

        // Check type to process
        if("team".equals(type)) {
            User user = userRepository.findByUsername(username).get();
            Order order = orderRepository.findByUserIdAndStatusAndTeam(user, 0, true).get();
            List<OrderDetail> orderDetails = (List<OrderDetail>) order.getOrderDetails();
            List<Product> products = new ArrayList<>();
            orderDetails.forEach(od -> products.add(od.getProduct()));


            // Total Price Current
            for(OrderDetail o : orderDetails) {
                totalPrice += o.getPriceCurrent();
            }

            // Group Order Info Response
            GroupOrderInfoResponse groupOrderInfoResponse = new GroupOrderInfoResponse();
            groupOrderInfoResponse.setUsername(username);
            groupOrderInfoResponse.setProducts(products);

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

                List<Product> productsMember = new ArrayList<>();
                groupOrderDetails.forEach(god -> {
                    productsMember.add(god.getProduct());
                });

                groupOrderInfoResponseMember.setUsername(gm.getName());
                groupOrderInfoResponseMember.setProducts(productsMember);

                groupOrderInfoResponses.add(groupOrderInfoResponseMember);
            }
        }

        // Result GroupOrder
        GroupOrderResponse groupOrderResponse = new GroupOrderResponse();
        groupOrderResponse.setGroupOrderInfoResponses(groupOrderInfoResponses);
        groupOrderResponse.setTotalPriceGroup(totalPrice);

        return ResponseEntity.ok(groupOrderResponse);
    }

}
