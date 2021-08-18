package com.fpt.hhtlmilkteaapi.entity;

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
@Table(name = "shorter")
public class Shorter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String shortUrl;

    @Column(name = "Long_url", columnDefinition = "MEDIUMTEXT")
    private String longUrl;

}
