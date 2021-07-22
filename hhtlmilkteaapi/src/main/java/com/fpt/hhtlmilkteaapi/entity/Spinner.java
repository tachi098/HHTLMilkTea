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
@Table(name="spinner")
public class Spinner implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String color;

    @CreationTimestamp
    private Date createdAt;

    public Spinner(long id, String name, String color) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
}
