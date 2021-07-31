package com.fpt.hhtlmilkteaapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orderdetail")
public class OrderDetail implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Long sizeOptionId;
    private String addOptionId;
    private int quantity;

    @Column(length = 1000)
    private String noteProduct;

    @ManyToOne
    @JoinColumn(
            name = "order_id",
            referencedColumnName = "id",
            nullable = false
    )
    @JsonIgnore
    private Order orderId;

    @ManyToOne
    @JoinColumn(
            name = "product_id",
            referencedColumnName = "id",
            nullable = false
    )
    @JsonIgnoreProperties("orderDetails")
    private Product product;
}
