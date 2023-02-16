package com.spotify.project.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "artists")
public class Artist {
    @Id
    @Column(name = "uuid", nullable = false)
    private String uuid;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "nationality", nullable = false)
    private String nationality;

    @Column(name = "birth_date")
    private Date birthDate;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.ALL
            },
            mappedBy = "artists")
    @JsonBackReference
    @JsonIgnore
    private List<Song> songs;

    @JsonIgnore
    @OneToMany(
            mappedBy = "artist",
            cascade = CascadeType.ALL
    )
    private List<ArtistSong> songsFromJoinTable = new ArrayList<>();

    public Artist(String uuid, String name, String nationality, Date birthDate, String lastName) {
        this.uuid = uuid;
        this.firstName = name;
        this.nationality = nationality;
        this.birthDate = birthDate;
        this.lastName = lastName;
    }

}
