package com.spotify.project.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.spotify.project.models.ArtistSong;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ArtistSongDto {
    @JsonProperty("idSong")
    private Integer idSong;

    @JsonProperty("uuidArtist")
    private String uuidArtist;


    public ArtistSongDto(ArtistSong artistSong)
    {
        this.idSong = artistSong.getSong().getId();
        this.uuidArtist = artistSong.getArtist().getUuid();
    }

    public ArtistSongDto(Integer idSong, String uuidArtist) {
        this.idSong = idSong;
        this.uuidArtist = uuidArtist;
    }
}
