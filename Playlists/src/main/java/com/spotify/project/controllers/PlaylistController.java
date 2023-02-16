package com.spotify.project.controllers;

import com.google.gson.JsonObject;
import com.spotify.project.components.authorize.AuthorizeComponent;
import com.spotify.project.exceptions.request.BadRequestException;
import com.spotify.project.exceptions.request.ResourceNotFoundException;
import com.spotify.project.exceptions.request.UnauthorizedException;
import com.spotify.project.dtos.PlaylistDto;
import com.spotify.project.services.PlaylistService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.MediaTypes;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.xml.sax.SAXException;

import javax.validation.Valid;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.util.List;

@RequestMapping("/playlists")
@RestController
@Tag(name = "playlists")
public class PlaylistController {
    @Autowired
    private AuthorizeComponent authorizeComponent;
    @Autowired
    PlaylistService playlistService;

    @GetMapping()
    @Operation(summary = "Retrieve all the playlists.")
    public ResponseEntity<List<PlaylistDto>> getAllPlaylists() {
        return new ResponseEntity<>(playlistService.getAllPlaylists(), new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/{_id}")
    @Operation(summary = "Get a playlist by id.")
    public ResponseEntity<PlaylistDto> getPlaylistById(@PathVariable String _id) {
        return new ResponseEntity<>(playlistService.getPlaylistById(_id), new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping(params = {"page", "items_per_page"})
    @Operation(summary = "Get the playlists by selecting the number of the page and the number of items per page.")
    public ResponseEntity<CollectionModel<PlaylistDto>> getAllPlaylistsPaginated(@RequestParam int page,
                                                                                 @RequestParam int items_per_page) {
        return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).
                body(playlistService.getPlaylistsPaginated(page, items_per_page));
    }

    @GetMapping(params = {"page"})
    @Operation(summary = "Get the playlists by selecting the number of the page and we have implicitly one item per page.")
    public ResponseEntity<CollectionModel<PlaylistDto>> getAllPlaylistsPaginatedImplicitItemsPerPage(@RequestParam int page) {
        return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).
                body(playlistService.getPlaylistsPaginated(page, 1));
    }

    @PutMapping("/add_song/{id}/to_playlist/{playlistName}")
    @Operation(summary = "Method that adds a song to a playlist.")
    public ResponseEntity<PlaylistDto> addSongToPlaylist(@PathVariable Integer id,
                                                         @PathVariable String playlistName,
                                                         @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader)
            throws Exception {
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "client"))
            try {
                return new ResponseEntity<>(playlistService.addSongToPlaylist(id, playlistName,
                        authorizationHeader.split(" ")[1]), new HttpHeaders(), HttpStatus.OK);
            } catch (Exception e) {
                throw new ResourceNotFoundException("Resource not found");
            }
        else
            throw new UnauthorizedException("Not authorized");
    }

    @PostMapping("/create_playlist/{id}/{playlistName}")
    @Operation(summary = "Method that creates a playlist.")
    public ResponseEntity<PlaylistDto> createPlaylist(@PathVariable Integer id,
                                                      @PathVariable String playlistName,
                                                      @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader)
            throws ParserConfigurationException, IOException, SAXException {
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "client"))
            return new ResponseEntity<>(playlistService.createPlaylist(playlistName, id),
                    new HttpHeaders(), HttpStatus.OK);
        else
            throw new UnauthorizedException("Not authorized");
    }

    @GetMapping("/get_all_playlists/{userId}")
    @Operation(summary = "Get all the playlists by user id.")
    public ResponseEntity<List<PlaylistDto>> getAllPlaylistsByUserId(@PathVariable Integer userId,
                                                                     @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (authorizationHeader.split(" ").length != 2)
            throw new BadRequestException("Bad request");
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "client"))
            return new ResponseEntity<>(playlistService.findPlaylistsByUserId(userId),
                    new HttpHeaders(), HttpStatus.OK);
        else
            throw new UnauthorizedException("Not authorized");


    }

    @PutMapping("/change_playlist_title/{initialPlaylistTitle}/{newp}")
    @Operation(summary = "Update the title of a playlist.")
    public ResponseEntity<PlaylistDto> changePlaylistTitle(@PathVariable String initialPlaylistTitle,
                                                           @PathVariable String newp,
                                                           @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "client"))
            return new ResponseEntity<>(playlistService.changePlaylistTitle(initialPlaylistTitle, newp),
                    new HttpHeaders(), HttpStatus.OK);
        else
            throw new UnauthorizedException("Not authorized");
    }

    @DeleteMapping("/delete_playlist/{id}")
    @Operation(summary = "Delete a playlist.")
    public ResponseEntity<Void> deletePlaylist(@PathVariable String id,
                                               @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "client")) {
            boolean deleted = playlistService.deletePlaylistById(id);
            if (deleted)
                return new ResponseEntity<>(new HttpHeaders(), HttpStatus.NO_CONTENT);
            else throw new ResourceNotFoundException("Resource not found");
        } else
            throw new UnauthorizedException("Not authorized");
    }


}
