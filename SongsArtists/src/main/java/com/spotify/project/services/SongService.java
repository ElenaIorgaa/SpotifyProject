package com.spotify.project.services;

import com.spotify.project.components.mappers.SongMapper;
import com.spotify.project.components.assemblers.SongModelAssembler;
import com.spotify.project.dtos.SongDto;
import com.spotify.project.models.Song;
import com.spotify.project.repositories.ArtistSongRepository;
import com.spotify.project.repositories.SongRepository;
import com.sun.scenario.effect.impl.sw.sse.SSEBlend_SRC_OUTPeer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class SongService  extends RepresentationModel<SongDto> {
    @Autowired
    private SongRepository repository;
    @Autowired
    private ArtistSongRepository joinTableRepository;
    @Autowired
    private SongMapper songMapper;

    @Autowired
    private SongModelAssembler songModelAssembler;

    @Autowired
    private PagedResourcesAssembler<Song> pagedResourcesAssembler;

    public CollectionModel<SongDto> getSongs(int page, int size)
    {
        return pagedResourcesAssembler.toModel(repository.findAll(PageRequest.of(page,size))
                ,songModelAssembler);
    }
    public int getNumberOfSongs()
    {
        return getAllSongs().size();
    }

    public List<SongDto> getAllSongs() {
        return repository.findAll().stream()
                .map(artist -> songMapper.mapToDto(artist))
                .collect(Collectors.toList());

    }

    public Optional<SongDto> getSongById(int id) {
        return repository.findById(id).map(song -> songMapper.mapToDto(song));
    }

    public void deleteSongById(int id) {
        repository.deleteById(id);
    }

    public List<SongDto> getSongByTitle(String title)
    {
        return repository.getSongsByTitle(title).stream()
                .map(song -> songMapper.mapToDto(song))
                .collect(Collectors.toList());
    }
    public List<SongDto> getSongByPartialTitle(String title)
    {
        List<Song> songs = repository.findAll();
        List<Song> foundSongs = new ArrayList<>();
        for(Song song : songs)
        {
            String songTitle = song.getTitle();
            if(songTitle.equals(title)
                    || songTitle.startsWith(title)
                    || songTitle.toLowerCase().equals(title)
                    || songTitle.toUpperCase().equals(title))
                foundSongs.add(song);
        }
        return foundSongs.stream().map(song -> songMapper.mapToDto(song))
                .collect(Collectors.toList());
    }

    public List<SongDto> getSongsByGenre(String genre) {
        return repository.getSongsByGenre(genre).stream()
                .map(song -> songMapper.mapToDto(song))
                .collect(Collectors.toList());
    }
    public List<SongDto> getSongsByYearOfRelease(String year) {
        return repository.getSongsByYear(year).stream()
                .map(song -> songMapper.mapToDto(song))
                .collect(Collectors.toList());
    }
    public SongDto addSong(SongDto songDto)
    {
        if(!repository.findById(songDto.getId()).isPresent())
            return songMapper.mapToDto(repository
                    .save(songMapper.mapToModel(songDto)));
        else return null;
    }
    public Boolean changeSongTitle(Integer id, String title)
    {
        repository.changeSongTitle(title,id);
        Optional<Song> song = repository.findById(id);
        return song.filter(value -> Objects.equals(value.getTitle(), title)).isPresent();
    }
    public Boolean changeSongLanguage(Integer id, String language)
    {
        repository.changeSongLanguage(language,id);
        Optional<Song> song = repository.findById(id);
        return song.filter(value -> Objects.equals(value.getTitle(), language)).isPresent();
    }

    public Boolean changeSongGenre(Integer id, String genre)
    {
        repository.changeSongGenre(genre,id);
        Optional<Song> song = repository.findById(id);
        return song.filter(value -> Objects.equals(value.getTitle(), genre)).isPresent();
    }
    public Boolean changeSong(SongDto songDto)
    {
        repository.updateSong(songDto.getTitle(),songDto.getDuration(), songDto.getLanguage(),
                songDto.getReleaseDate(), songDto.getGenre(), songDto.getType().toString(), songDto.getId());
        Optional<Song> song = repository.findById(songDto.getId());
        return song.filter(value -> value.getTitle().equals(songDto.getTitle()) &&
                value.getDuration() == songDto.getDuration() &&
                value.getLanguage().equals(songDto.getLanguage()) &&
                value.getGenre().equals(songDto.getGenre()) &&
                value.getType().toString().equals(songDto.getType().toString())).isPresent();
    }
    public boolean deleteSong(Integer id)
    {
        if(repository.findById(id).isPresent()) {
            joinTableRepository.deleteSongArtistBySong(id);
            repository.deleteSongById(id);
            return true;
        }
        else return false;
    }

}
