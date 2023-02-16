package com.spotify.project.services;

import com.spotify.project.components.mappers.ArtistSongMapper;
import com.spotify.project.dtos.ArtistSongDto;
import com.spotify.project.repositories.ArtistRepository;
import com.spotify.project.exceptions.BusinessLogicException;
import com.spotify.project.repositories.ArtistSongRepository;
import com.spotify.project.repositories.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArtistSongService {
    @Autowired
    private ArtistSongMapper artistSongMapper;
    @Autowired
    private ArtistSongRepository artistSongRepository;
    @Autowired
    private ArtistRepository  artistRepository;
    @Autowired
    private SongRepository songRepository;

    public List<ArtistSongDto> getAllArtistSongs()
    {
        return artistSongRepository.findAll().stream()
                .map(value -> artistSongMapper.mapToDto(value))
                .collect(Collectors.toList());
    }

    public List<ArtistSongDto> getArtistSongBySongId(Integer idSong)
    {
        return artistSongRepository.getBySongId(idSong).stream()
                .map(value -> artistSongMapper.mapToDto(value))
                .collect(Collectors.toList());
    }
    public List<ArtistSongDto> getArtistSongByArtistUuid(String uuidArtist)
    {
        return artistSongRepository.getByArtistId(uuidArtist).stream()
                .map(value -> artistSongMapper.mapToDto(value))
                .collect(Collectors.toList());
    }
    public ArtistSongDto addArtistSong(ArtistSongDto artistSongDto) throws BusinessLogicException {
        return artistSongMapper.mapToDto(artistSongRepository
                .save(artistSongMapper.mapToModel(artistSongDto,artistRepository,songRepository)));
    }
    public void deleteArtistSongBySongId(Integer id)
    {
        artistSongRepository.deleteSongArtistBySong(id);
    }
    public void deleteArtistSongByArtistUuid(String uuid)
    {
        artistSongRepository.deleteSongArtistByArtist(uuid);
    }
    public void deleteArtistSong(Integer id, String uuid)
    {
        artistSongRepository.deleteSongArtist(id, uuid);
    }
}
