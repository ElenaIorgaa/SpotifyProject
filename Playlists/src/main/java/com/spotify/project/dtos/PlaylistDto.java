package com.spotify.project.dtos;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.spotify.project.controllers.PlaylistController;
import com.spotify.project.models.Song;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.hateoas.RepresentationModel;
@NoArgsConstructor
@Getter
@Setter
public class PlaylistDto extends RepresentationModel<PlaylistDto> {
    @JsonProperty("id")
    private ObjectId id;
    @JsonProperty("playlistName")
    private String playlistName;
    @JsonProperty("userId")
    private Integer userId;
    @JsonProperty("numberOfRequests")
    private Integer numberOfRequests;
    @JsonProperty("songs")
    private ArrayList<Song> songs;
    @JsonCreator
    public PlaylistDto( ObjectId id,  String playlistName, Integer userId,
                      Integer numberOfRequests,  ArrayList<Song> songs) {
        this.id = id;
        this.playlistName = playlistName;
        this.numberOfRequests = numberOfRequests;
        this.songs = songs;
        add(linkTo(methodOn(PlaylistController.class).getPlaylistById(id.toString())).withSelfRel());
        add(linkTo(methodOn(PlaylistController.class).getAllPlaylists()).withRel("parent"));
    }

}
