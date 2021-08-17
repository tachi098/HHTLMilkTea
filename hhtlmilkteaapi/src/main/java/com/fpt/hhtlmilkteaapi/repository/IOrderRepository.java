package com.fpt.hhtlmilkteaapi.repository;

import com.fpt.hhtlmilkteaapi.entity.Order;
import com.fpt.hhtlmilkteaapi.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IOrderRepository extends JpaRepository<Order, String> {
    Order findOrderByUserId_IdAndStatusLike(long id, int status, Sort sort);
    Page<Order> findAllByUserIdEqualsAndStatusIn(Optional<User> user, List<Integer> status, Pageable pageable);
    Page<Order> findAllByStatusIn(List<Integer> status, Pageable pageable);

}
