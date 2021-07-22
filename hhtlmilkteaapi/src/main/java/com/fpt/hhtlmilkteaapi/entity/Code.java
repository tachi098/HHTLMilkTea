package com.fpt.hhtlmilkteaapi.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name="code")
public class Code implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private long mark;
    private String username;
    private Date endDate; // Cộng 30 ngày lúc quay vào voucher

    @CreationTimestamp
    private Date createdAt;

    public Code(long id, String name, long mark, String username, Date endDate) {
        this.id = id;
        this.name = name;
        this.mark = mark;
        this.username = username;
        this.endDate = endDate;
    }
}
