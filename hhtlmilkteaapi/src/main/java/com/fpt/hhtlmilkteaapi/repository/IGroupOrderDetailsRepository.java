package com.fpt.hhtlmilkteaapi.repository;

import com.fpt.hhtlmilkteaapi.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IGroupOrderDetailsRepository extends JpaRepository<GroupOrderDetails, Long> {

    List<GroupOrderDetails> findAllByGroupMember(GroupMember groupMember);

    GroupOrderDetails findByGroupMemberAndProductAndAddOptionIdLikeAndSizeOptionIdLike(GroupMember groupMember, Product product, String addOptionId, String sizeOptionId);

}
