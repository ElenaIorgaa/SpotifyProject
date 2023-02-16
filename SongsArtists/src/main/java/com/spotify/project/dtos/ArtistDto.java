package com.spotify.project.dtos;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.spotify.project.controllers.ArtistController;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.Id;
import java.util.Date;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Getter
@Setter
@NoArgsConstructor
public class ArtistDto extends RepresentationModel<ArtistDto> {
    @Id
    @JsonProperty("uuid")
    @NotNull
    private String uuid;
    @NotNull
    @JsonProperty("first_name")
    private String firstName;
    @NotNull
    @JsonProperty("last_name")
    private String lastName;
    @NotNull
    @JsonProperty("nationality")
    private String nationality;

    @NotNull
    @JsonProperty("birthDate")
    private Date birthDate;


    @JsonCreator
    public ArtistDto( String uuid,  String firstName, String lastName,
                      String nationality,  Date birthDate) {
        this.uuid = uuid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nationality = nationality;
        this.birthDate = birthDate;
        add(linkTo(methodOn(ArtistController.class).getArtistById(uuid,"")).withSelfRel());
        add(linkTo(methodOn(ArtistController.class).getAllArtists("")).withRel("parent"));
    }
}
