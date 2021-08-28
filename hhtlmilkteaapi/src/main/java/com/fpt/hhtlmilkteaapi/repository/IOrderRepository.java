package com.fpt.hhtlmilkteaapi.repository;

import com.fpt.hhtlmilkteaapi.entity.Order;
import com.fpt.hhtlmilkteaapi.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface IOrderRepository extends JpaRepository<Order, String> {
    Order findOrderByUserId_IdAndStatusLike(long id, int status, Sort sort);
    Page<Order> findAllByUserIdEqualsAndStatusIn(Optional<User> user, List<Integer> status, Pageable pageable);
    Page<Order> findAllByStatusIn(List<Integer> status, Pageable pageable);

    Optional<Order> findByUserIdAndStatusAndTeam(User userId, int status, boolean team);

    @Query(value = "SELECT month(created_at) AS month, sum(total_price) revenue FROM hhtlmilktea.order where year(created_at) = ?1  and status = 3 group by month(created_at) order by month(created_at)", nativeQuery = true)
    List<Object> countRevenueByYear(int year);

    @Query(value = "SELECT DISTINCT year(created_at) as year FROM hhtlmilktea.order order by year(created_at) DESC", nativeQuery = true)
    List<Integer> getAllYears();

    @Query(value = "SELECT SUM(total_price) FROM hhtlmilktea.order WHERE year(created_at) = ?1 AND status = 3", nativeQuery = true)
    Integer sumRevenue(int year);

    @Query(value = "SELECT sum(total_price) FROM hhtlmilktea.order  where date(created_at) = curdate() AND status = 3", nativeQuery = true)
    Integer revenueToday();

    @Query(value = "select * from hhtlmilktea.order order by id desc limit 5", nativeQuery = true)
    List<Order> lastFiveOrders();

    Order findByIdEquals(String id);
}
