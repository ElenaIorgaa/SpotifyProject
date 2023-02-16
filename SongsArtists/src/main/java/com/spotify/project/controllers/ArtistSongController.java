package com.spotify.project.controllers;

import com.spotify.project.components.authorize.AuthorizeComponent;
import com.spotify.project.dtos.ArtistSongDto;
import com.spotify.project.requests.SongArtistRequest;
import com.spotify.project.services.ArtistSongService;
import com.spotify.project.exceptions.BusinessLogicException;
import com.spotify.project.exceptions.requests.UnauthorizedException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Tag(name = "songs_artists_relationship")
@RequestMapping("/api/songcollection")
public class ArtistSongController {
    @Autowired
    private AuthorizeComponent authorizeComponent;
    @Autowired
    private ArtistSongService artistSongService;

    @GetMapping("/songs_artists")
    @Operation(summary = "Retrive all the song/album-artist relationship")
    public List<ArtistSongDto> getAllRelationships() {
        return artistSongService.getAllArtistSongs();
    }

    @GetMapping("/songs/{id}/artists")
    @Operation(summary = "Retrieve all artists that have a certain song.")
    public List<ArtistSongDto> getBySongId(@PathVariable Integer id) {
        return artistSongService.getArtistSongBySongId(id);
    }

    @GetMapping("/artists/{uuid}/songs")
    @Operation(summary = "Get all songs that have a certain artist.")
    public List<ArtistSongDto> getByArtistUuid(@PathVariable String uuid) {
        return artistSongService.getArtistSongByArtistUuid(uuid);
    }

    @PutMapping("/{id}/add_song/{uuid}")
    @Operation(summary = "Assign a song to a certain artist.")
    public ResponseEntity<ArtistSongDto> assignSongToArtist
            (@PathVariable Integer id,
             @PathVariable String uuid,
             @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader)
            throws BusinessLogicException {
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager") ||
                authorizeComponent.authorize(authorizationHeader.split(" ")[1], "artist"))
            return new ResponseEntity<>(artistSongService
                    .addArtistSong(new ArtistSongDto(id, uuid)), new HttpHeaders(), HttpStatus.OK);
        else
            throw new UnauthorizedException("Not authorized");
    }
    @DeleteMapping("/delete_artist_song_by_song/{id}")
    @Operation(summary="Deletes an artist song relationship by song id.")
    public ResponseEntity<Void> deleteSongArtistBySong(@PathVariable Integer id)
    {
        artistSongService.deleteArtistSongBySongId(id);
        return new ResponseEntity<>(new HttpHeaders(), HttpStatus.NO_CONTENT);
    }
    @DeleteMapping("/delete_artist_song_by_song/{uuid}")
    @Operation(summary="Deletes an artist song relationship by song id.")
    public ResponseEntity<Void> deleteSongArtistByArtist(@PathVariable String uuid)
    {
        artistSongService.deleteArtistSongByArtistUuid(uuid);
        return new ResponseEntity<>(new HttpHeaders(), HttpStatus.NO_CONTENT);
    }
    @DeleteMapping("/delete_artist_song")
    @Operation(summary = "Deletes an artist - song relationship.")
    public ResponseEntity<Void> deleteSongArtist(@PathVariable @Valid SongArtistRequest request)
    {
        artistSongService.deleteArtistSong(request.getSongId(), request.getArtistId());
        return new ResponseEntity<>(new HttpHeaders(), HttpStatus.NO_CONTENT);
    }


}
