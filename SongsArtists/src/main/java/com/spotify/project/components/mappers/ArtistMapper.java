package com.spotify.project.components.mappers;

import com.spotify.project.dtos.ArtistDto;
import com.spotify.project.models.Artist;
import org.springframework.stereotype.Component;

@Component
public class ArtistMapper {
    public ArtistDto mapToDto(Artist artist) {
        return new ArtistDto(artist.getUuid(), artist.getFirstName(),
                artist.getLastName(), artist.getNationality(),
                artist.getBirthDate());
    }
    public Artist mapToModel(ArtistDto artistDto)
    {
        return new Artist(artistDto.getUuid(), artistDto.getFirstName(),
                artistDto.getNationality(),artistDto.getBirthDate(),artistDto.getLastName());
    }
}
