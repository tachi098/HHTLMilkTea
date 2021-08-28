package com.fpt.hhtlmilkteaapi.repository;

import com.fpt.hhtlmilkteaapi.entity.GroupMember;
import com.fpt.hhtlmilkteaapi.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IGroupMemberRepository extends JpaRepository<GroupMember, Long> {

    List<GroupMember> findAllByUsernameOwner(String usernameOwner);

    List<GroupMember> findAllByUsernameOwnerAndOrder(String usernameOwner, Order order);

    List<GroupMember> findAllByOrder(Order order);

    Optional<GroupMember> findByNameAndUsernameOwnerAndOrder(String name, String usernameOwner, Order order);

    Optional<GroupMember> findByNameAndUsernameOwner(String name, String usernameOwner);
}
