package com.spotify.project.components.mappers;

import com.spotify.project.dtos.ArtistSongDto;
import com.spotify.project.models.Artist;
import com.spotify.project.models.ArtistSong;
import com.spotify.project.repositories.ArtistRepository;
import com.spotify.project.exceptions.BusinessLogicException;
import com.spotify.project.exceptions.enums.BusinessLogicError;
import com.spotify.project.models.Song;
import com.spotify.project.repositories.SongRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ArtistSongMapper {
    public ArtistSongDto mapToDto(ArtistSong artistSong)
    {
        return new ArtistSongDto(artistSong);
    }
    public ArtistSong mapToModel(ArtistSongDto artistSongDto, ArtistRepository artistRepository,
                                 SongRepository songRepository) throws BusinessLogicException {
        Optional<Artist> artist = artistRepository.findById(artistSongDto.getUuidArtist());
        Optional<Song> song = songRepository.findById(artistSongDto.getIdSong());
        if(artist.isPresent() && song.isPresent())
            return new ArtistSong(song.get(),artist.get());
        else
            throw new BusinessLogicException(BusinessLogicError.FAILED);
    }
}
