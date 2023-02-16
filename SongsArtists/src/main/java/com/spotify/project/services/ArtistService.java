package com.spotify.project.services;

import com.spotify.project.components.mappers.ArtistMapper;
import com.spotify.project.components.assemblers.ArtistModelAssembler;
import com.spotify.project.dtos.ArtistDto;
import com.spotify.project.models.Artist;
import com.spotify.project.repositories.ArtistRepository;
import com.spotify.project.repositories.ArtistSongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.CollectionModel;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ArtistService {
    @Autowired
    private ArtistRepository repository;
    @Autowired
    private PagedResourcesAssembler<Artist> pagedResourcesAssembler;
    @Autowired
    private ArtistMapper artistMapper;
    @Autowired
    private ArtistModelAssembler songModelAssembler;

    @Autowired
    private ArtistSongRepository joinTableRepository;

    public List<ArtistDto> getAllArtists() {
        return repository.findAll().stream()
                .map(artist -> artistMapper.mapToDto(artist))
                .collect(Collectors.toList());
    }
public CollectionModel<ArtistDto> getArtists(int page, int size)
{
    return pagedResourcesAssembler.toModel(repository.findAll(PageRequest.of(page,size))
            ,songModelAssembler);
}

    public Optional<ArtistDto> getArtistById(String uuid) {
        return repository.findById(uuid)
                .map(artist -> artistMapper.mapToDto(artist));
    }

    public List<ArtistDto> getArtistsByFirstName(String name)
    {
        return repository.getArtistsByFirstName(name).stream()
                .map(artist -> artistMapper.mapToDto(artist)).collect(Collectors.toList());
    }
    public List<ArtistDto> getArtistsByLastName(String name)
    {
        return repository.getArtistsByLastName(name).stream()
                .map(artist -> artistMapper.mapToDto(artist)).collect(Collectors.toList());
    }
    public List<ArtistDto> getArtistByPartialFirstName(String name)
    {
        List<Artist> artists = repository.findAll();
        List<Artist> foundArtists = new ArrayList<>();
        for(Artist artist : artists)
        {
            String artistFirstName = artist.getFirstName();
            if(artistFirstName.equals(name)
                    || artistFirstName.startsWith(name)
                    || artistFirstName.toLowerCase().equals(name)
                    || artistFirstName.toUpperCase().equals(name))
                foundArtists.add(artist);
        }
        return foundArtists.stream().map(song -> artistMapper.mapToDto(song))
                .collect(Collectors.toList());
    }
    public ArtistDto addArtist(ArtistDto artistDto)
    {
        return artistMapper.mapToDto(repository
                .save(artistMapper.mapToModel(artistDto)));
    }

    public Boolean checkIfArtistAlreadyStored(ArtistDto artistDto)
    {
        return getArtistById(artistDto.getUuid()).isPresent();
    }
    public boolean deleteArtist(String uuid)
    {
        if(repository.findById(uuid).isPresent()) {
            joinTableRepository.deleteSongArtistByArtist(uuid);
            repository.deleteById(uuid);
            return true;
        }
        else return false;
    }
}
