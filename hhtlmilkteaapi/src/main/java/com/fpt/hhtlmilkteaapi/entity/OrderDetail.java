package com.fpt.hhtlmilkteaapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "orderdetail")
public class OrderDetail implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int sizeOptionId;
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
}
