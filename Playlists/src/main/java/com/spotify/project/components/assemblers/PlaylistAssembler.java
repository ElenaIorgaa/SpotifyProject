package com.spotify.project.components.assemblers;

import com.spotify.project.components.mappers.PlaylistMapper;
import com.spotify.project.controllers.PlaylistController;
import com.spotify.project.dtos.PlaylistDto;
import com.spotify.project.models.Playlist;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class PlaylistAssembler implements RepresentationModelAssembler<Playlist, PlaylistDto> {
    @Autowired
    private PlaylistMapper playlistMapper;
    @Override
    public PlaylistDto toModel(Playlist playlist)
    {
        return playlistMapper.mapToDto(playlist);
    }
    @Override
    public CollectionModel<PlaylistDto> toCollectionModel(Iterable<? extends Playlist> artistList)
    {
        ModelMapper modelMapper = new ModelMapper();
        List<PlaylistDto> songDto = new ArrayList<>();

        for (Playlist playlist : artistList) {
            PlaylistDto playlistDto1 = modelMapper.map(playlist, PlaylistDto.class);
            playlistDto1.add(linkTo(methodOn(PlaylistController.class)
                    .getPlaylistById(playlistDto1.getId().toString())).withSelfRel().withType("GET"));
            songDto.add(playlistDto1);
        }

        return CollectionModel.of(songDto);
    }
}
