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
@Table(name="voucher")
public class Voucher implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String codeName;
    private String userName;
    private boolean status;

    @CreationTimestamp
    private Date createdAt;

    public Voucher(long id, String codeName, String userName, boolean status) {
        this.id = id;
        this.codeName = codeName;
        this.userName = userName;
        this.status = status;
    }
}
