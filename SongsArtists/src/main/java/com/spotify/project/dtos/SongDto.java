package com.spotify.project.dtos;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.spotify.project.controllers.SongController;
import com.spotify.project.models.enums.SongType;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.Id;
import java.util.*;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Getter
@Setter
@NoArgsConstructor
public class SongDto extends RepresentationModel<SongDto> {
    @Id
    @JsonProperty("id")
    private Integer id;
    @NotNull
    @JsonProperty("title")
    private String title;
    @NotNull
    @JsonProperty("duration")
    private Integer duration;
    @NotNull
    @JsonProperty("language")
    private String language;
    @NotNull
    @JsonProperty("releaseDate")
    private Date releaseDate;
    @JsonIgnore
    private Link href;

    @JsonProperty("genre")
    private String genre;

    @JsonProperty("type")
    private SongType type;

    @JsonCreator
    public SongDto(int id,  String title, int duration,  String language,
                   Date releaseDate, String genre,  SongType type) {
        this.id = id;
        this.title = title;
        this.duration = duration;
        this.language = language;
        this.releaseDate = releaseDate;
        this.genre = genre;
        this.type = type;
        add(linkTo(methodOn(SongController.class).getSongById(id,"")).withSelfRel().withType("GET"));
        href = linkTo(methodOn(SongController.class).getSongById(id,"")).withSelfRel().withType("GET");
        add(linkTo(methodOn(SongController.class).getSongs()).withRel("parent").withType("GET"));
    }


}
