package com.spotify.project.components.mappers;

import com.spotify.project.dtos.SongDto;
import com.spotify.project.models.Song;
import org.springframework.stereotype.Component;

@Component
public class SongMapper {
    public SongDto mapToDto(Song song) {
        return new SongDto(song.getId(), song.getTitle(),
                song.getDuration(), song.getLanguage(),
                song.getReleaseDate(), song.getGenre(), song.getType());
    }
    public Song mapToModel(SongDto songDto)
    {
        return new Song(songDto.getId(),songDto.getTitle(),songDto.getDuration(),songDto.getLanguage(),
                songDto.getReleaseDate(),songDto.getGenre(),songDto.getType());
    }
}
