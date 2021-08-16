package com.fpt.hhtlmilkteaapi.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="voucher")
public class Voucher implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String codeName;
    private String userName;

    @CreationTimestamp
    private Date createdAt;

    public Voucher(long id, String codeName, String userName) {
        this.id = id;
        this.codeName = codeName;
        this.userName = userName;
    }
}
