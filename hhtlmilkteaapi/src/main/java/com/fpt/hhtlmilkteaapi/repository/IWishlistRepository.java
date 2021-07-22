package com.fpt.hhtlmilkteaapi.repository;

import com.fpt.hhtlmilkteaapi.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IWishlistRepository extends JpaRepository<Wishlist, Long> {
}
