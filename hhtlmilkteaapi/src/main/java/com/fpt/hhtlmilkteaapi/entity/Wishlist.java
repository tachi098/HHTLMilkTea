package com.fpt.hhtlmilkteaapi.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="wishlist")
public class Wishlist implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private long userId;
    private String productId;

    public Wishlist(long userId, String productId) {
        this.userId = userId;
        this.productId = productId;
    }
}
