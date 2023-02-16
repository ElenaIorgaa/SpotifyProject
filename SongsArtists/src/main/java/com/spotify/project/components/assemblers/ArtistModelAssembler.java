package com.spotify.project.components.assemblers;

import com.spotify.project.controllers.ArtistController;
import com.spotify.project.components.mappers.ArtistMapper;
import com.spotify.project.dtos.ArtistDto;
import com.spotify.project.models.Artist;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class ArtistModelAssembler implements RepresentationModelAssembler<Artist, ArtistDto> {
    @Autowired
    private ArtistMapper artistMapper;
    @Override
    public ArtistDto toModel(Artist artist)
    {
        return artistMapper.mapToDto(artist);
    }
    @Override
    public CollectionModel<ArtistDto> toCollectionModel(Iterable<? extends Artist> artistList)
    {
        ModelMapper modelMapper = new ModelMapper();
        List<ArtistDto> songDto = new ArrayList<>();

        for (Artist song : artistList) {
            ArtistDto songDto1 = modelMapper.map(song, ArtistDto.class);
            songDto1.add(linkTo(methodOn(ArtistController.class)
                    .getArtistById(songDto1.getUuid(),"")).withSelfRel().withType("GET"));
            songDto.add(songDto1);
        }

        return CollectionModel.of(songDto);
    }
}