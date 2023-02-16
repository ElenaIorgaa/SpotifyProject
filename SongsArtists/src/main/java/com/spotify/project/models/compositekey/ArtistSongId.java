package com.spotify.project.models.compositekey;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@Embeddable
public class ArtistSongId implements Serializable {
    private static final long serialVersionUID = 2254769065122851546L;
    @Column(name = "song_id")
    private Integer idASong;
    @Column(name="artist_uuid")
    private String idArtist;

    public ArtistSongId(Integer idASong, String idArtist) {
        this.idASong = idASong;
        this.idArtist = idArtist;
    }
}
