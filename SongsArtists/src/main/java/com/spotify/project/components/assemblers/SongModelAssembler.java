package com.spotify.project.components.assemblers;

import com.spotify.project.components.mappers.SongMapper;
import com.spotify.project.controllers.SongController;
import com.spotify.project.dtos.SongDto;
import com.spotify.project.models.Song;
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
public class SongModelAssembler implements RepresentationModelAssembler<Song, SongDto> {
    @Autowired
    private SongMapper songMapper;

    @Override
    public SongDto toModel(Song song) {
        return songMapper.mapToDto(song);
    }

    @Override
    public CollectionModel<SongDto> toCollectionModel(Iterable<? extends Song> songList) {
        ModelMapper modelMapper = new ModelMapper();
        List<SongDto> songDto = new ArrayList<>();

        for (Song song : songList) {
            SongDto songDto1 = modelMapper.map(song, SongDto.class);
            songDto1.add(linkTo(methodOn(SongController.class)
                    .getSongById(songDto1.getId(),"")).withSelfRel().withType("GET"));
            songDto.add(songDto1);
        }

        return CollectionModel.of(songDto);
    }
}
