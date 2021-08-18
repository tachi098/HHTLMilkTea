package com.fpt.hhtlmilkteaapi.repository;

import com.fpt.hhtlmilkteaapi.entity.GroupMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IGroupMemberRepository extends JpaRepository<GroupMember, Long> {

    List<GroupMember> findAllByUsernameOwner(String usernameOwner);

}
