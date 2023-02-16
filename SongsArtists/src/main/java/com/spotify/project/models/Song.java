package com.spotify.project.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.spotify.project.models.enums.SongType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "songs")
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "duration", nullable = false)
    private int duration;

    @Column(name = "language", nullable = false)
    private String language;

    @Column(name = "release_date")
    private Date releaseDate;

    @Column(name = "genre")
    private String genre;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private SongType type;
    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.ALL
            })
    @JsonManagedReference
    @JoinTable(name = "artist_song",
            joinColumns = {@JoinColumn(name = "song_id")},
            inverseJoinColumns = {@JoinColumn(name = "artist_uuid")})
    private List<Artist> artists;

    @JsonIgnore
    @OneToMany(
            mappedBy = "song",
            cascade = CascadeType.ALL
    )
    private List<ArtistSong> artistsFromJoinTable = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Song song = (Song) o;
        return duration == song.duration && Objects.equals(id, song.id) && Objects.equals(title, song.title) && Objects.equals(language, song.language) && Objects.equals(releaseDate, song.releaseDate);
    }

    public Song(Integer id, String title, int duration, String language,
                Date releaseDate, String genre, SongType type) {
        this.id = id;
        this.title = title;
        this.duration = duration;
        this.language = language;
        this.releaseDate = releaseDate;
        this.genre = genre;
        this.type = type;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, duration, language, releaseDate);
    }

    @Override
    public String toString() {
        return "Song{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", duration=" + duration +
                ", languange='" + language + '\'' +
                ", releaseDate=" + releaseDate +
                ", type = " + type +
                '}';
    }

}
