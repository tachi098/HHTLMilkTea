package com.fpt.hhtlmilkteaapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Nationalized;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table(name="product")
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id; // Sử dụng P + getTime()

    private String name;
    private String title;

    private String linkImage;
    private String nameImage;
    private long price;

    @CreationTimestamp
    private Date createdAt;

    @CreationTimestamp
    private Date updatedAt;

    private Date deletedAt;

    @ManyToOne
    @JoinColumn(
            name = "category_id",
            referencedColumnName = "id",
            nullable = false
    )
    @JsonIgnore
    private Category categoryId;

    @OneToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "product"
    )
    private SaleOff saleOff;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "product_sizeoption",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "sizeoption_id")
    )
    private Set<SizeOption> sizeOptions;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "product_additionoption",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "additionoption_id")
    )
    private Set<AdditionOption> additionOptions;

    @OneToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "product"
    )
    private OrderDetail orderDetail;
}
