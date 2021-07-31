package com.fpt.hhtlmilkteaapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(
        name="category",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "name")
        }
)
public class Category implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NonNull
    private long id;

    @NonNull
    private String name;

    @CreationTimestamp
    private Date createdAt;

    @CreationTimestamp
    private Date updatedAt;

    private Date deletedAt;

    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "categoryId",
            cascade = CascadeType.ALL
    )
    @JsonIgnoreProperties("categoryId")
    private Collection<Product> products;

}
