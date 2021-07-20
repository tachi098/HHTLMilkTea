package com.fpt.hhtlmilkteaapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name="\"order\"")
public class Order implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String address;
    private String phone;

    @ColumnDefault("0")
    private int payment;

    @Column(length = 1000)
    private String noteOrder;

    @ColumnDefault("0")
    private long memberVip;

    @CreationTimestamp
    private Date createdAt;

    @CreationTimestamp
    private Date updatedAt;

    private Date deletedAt;

    @ManyToOne
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "id",
            nullable = false
    )
    @JsonIgnore
    private User userId;

    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "orderId",
            cascade = CascadeType.ALL
    )
    private Collection<OrderDetail> orderDetails;
}
