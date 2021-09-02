package com.fpt.hhtlmilkteaapi.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name="rating")
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NonNull
    private long id;

    @Column(length = 1000)
    private String content;

    @ColumnDefault("0")
    private double rate;

    @NonNull
    private String username;
}
