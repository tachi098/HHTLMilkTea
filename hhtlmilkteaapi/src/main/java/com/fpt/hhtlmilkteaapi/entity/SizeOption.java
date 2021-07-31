package com.fpt.hhtlmilkteaapi.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "sizeoption")
public class SizeOption implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NonNull
    private long id;

    @NonNull
    private String name;

    @NonNull
    private int price;

    @CreationTimestamp
    private Date createdAt;

    @CreationTimestamp
    private Date updatedAt;

    private Date deletedAt;

}
