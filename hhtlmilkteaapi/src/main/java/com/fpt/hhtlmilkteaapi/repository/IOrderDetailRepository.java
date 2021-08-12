package com.fpt.hhtlmilkteaapi.repository;

import com.fpt.hhtlmilkteaapi.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IOrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    List<OrderDetail> findByOrderId_Id(String id);

    OrderDetail findByOrderId_IdAndProduct_IdAndAddOptionIdLikeAndSizeOptionIdLike(String id, String pId, String add, String size);
}
