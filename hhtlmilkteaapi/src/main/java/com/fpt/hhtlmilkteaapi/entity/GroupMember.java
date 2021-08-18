package com.fpt.hhtlmilkteaapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "groupmember")
public class GroupMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String usernameOwner;

    @ManyToOne
    @JoinColumn(
            name = "order_id",
            referencedColumnName = "id",
            nullable = false
    )
    @JsonIgnore
    private Order order;

    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "groupMember",
            cascade = CascadeType.ALL
    )
    private Collection<GroupOrderDetails> groupOrderDetails;

    public GroupMember(long id, String name, String usernameOwner, Order order) {
        this.id = id;
        this.name = name;
        this.usernameOwner = usernameOwner;
        this.order = order;
    }
}
