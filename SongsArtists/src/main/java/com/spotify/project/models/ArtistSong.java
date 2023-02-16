package com.spotify.project.models;

import com.spotify.project.models.compositekey.ArtistSongId;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "artist_song")
public class ArtistSong {
    @EmbeddedId
    private ArtistSongId id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @MapsId("idSong")
    private Song song;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @MapsId("idArtist")
    private Artist artist;

    public ArtistSong(Song song, Artist artist)
    {
        this.song = song;
        this.artist = artist;
        this.id = new ArtistSongId(song.getId(),artist.getUuid());
    }
}
