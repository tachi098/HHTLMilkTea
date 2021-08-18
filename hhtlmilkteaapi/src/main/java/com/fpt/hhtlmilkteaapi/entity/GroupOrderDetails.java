package com.fpt.hhtlmilkteaapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "grouporderdetails")
public class GroupOrderDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String sizeOptionId;
    private String addOptionId;
    private int quantity;
    private long priceCurrent;

    @Column(length = 1000)
    private String noteProduct;

    @ManyToOne
    @JoinColumn(
            name = "groupMember_id",
            referencedColumnName = "id",
            nullable = false
    )
    @JsonIgnore
    private GroupMember groupMember;

    @ManyToOne
    @JoinColumn(
            name = "product_id",
            referencedColumnName = "id",
            nullable = false
    )
    @JsonIgnoreProperties("groupOrderDetails")
    private Product product;

}
