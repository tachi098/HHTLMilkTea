package com.fpt.hhtlmilkteaapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Nationalized;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="product")
public class Product implements Serializable {

    @Id
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

//    @OneToOne(fetch = FetchType.LAZY, cascade= CascadeType.ALL)
//    @JoinColumn(name = "saleoff_id", nullable = false)
//    private SaleOff saleOff;

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

    public Product(String id, String name, String title, String linkImage, String nameImage, long price, Category categoryId, Set<SizeOption> sizeOptions, Set<AdditionOption> additionOptions) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.linkImage = linkImage;
        this.nameImage = nameImage;
        this.price = price;
        this.categoryId = categoryId;
        this.sizeOptions = sizeOptions;
        this.additionOptions = additionOptions;
//        this.saleOff = saleOff;
    }
}
