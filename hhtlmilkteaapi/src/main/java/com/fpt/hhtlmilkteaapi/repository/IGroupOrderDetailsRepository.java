package com.fpt.hhtlmilkteaapi.repository;

import com.fpt.hhtlmilkteaapi.entity.AdditionOption;
import com.fpt.hhtlmilkteaapi.entity.GroupMember;
import com.fpt.hhtlmilkteaapi.entity.GroupOrderDetails;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IGroupOrderDetailsRepository extends JpaRepository<GroupOrderDetails, Long> {

    List<GroupOrderDetails> findAllByGroupMember(GroupMember groupMember);

}
