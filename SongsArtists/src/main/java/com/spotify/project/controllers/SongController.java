package com.spotify.project.controllers;

import com.spotify.project.components.authorize.AuthorizeComponent;
import com.spotify.project.exceptions.requests.NotAcceptableException;
import com.spotify.project.exceptions.requests.ResourceNotFoundException;
import com.spotify.project.exceptions.requests.UnauthorizedException;
import com.spotify.project.models.Song;
import com.spotify.project.dtos.SongDto;
import com.spotify.project.requests.UpdateLanguageRequest;
import com.spotify.project.requests.UpdateSongGenre;
import com.spotify.project.requests.UpdateTitleRequest;
import com.spotify.project.services.SongService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/songcollection/songs")
@Tag(name = "songs")
public class SongController extends RepresentationModel<SongDto> {

    @Autowired
    private SongService songService;

    @Autowired
    private AuthorizeComponent authorizeComponent;

    @Autowired
    private PagedResourcesAssembler<Song> pagedResourcesAssembler;
    private final Logger logger = LoggerFactory.getLogger(SongController.class);
    @GetMapping("/{id}")
    @Operation(summary = "Gets a song by its id.")
    public ResponseEntity<SongDto> getSongById(@PathVariable int id,
                                               @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager")
                || authorizeComponent.authorize(authorizationHeader.split(" ")[1], "artist")
                || authorizeComponent.authorize(authorizationHeader.split(" ")[1], "client")) {
            logger.info("[{}] -> GET, getSongById, id:{}", this.getClass(),id);
            return songService.getSongById(id)
                    .map(value -> new ResponseEntity<>(value, new HttpHeaders(), HttpStatus.OK))
                    .orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
        }
        else
            throw new UnauthorizedException("Not authorized");

    }

    @GetMapping(params = {"page", "items_per_page"})
    @Operation(summary = "Retrieve all songs but using a paginated view by specifying page and items per page. ")
    public ResponseEntity<CollectionModel<SongDto>> getAllSongs(@RequestParam int page,
                                                                @RequestParam int items_per_page,
                                                                @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager")
                || authorizeComponent.authorize(authorizationHeader.split(" ")[1], "artist")
                || authorizeComponent.authorize(authorizationHeader.split(" ")[1], "client")) {
            logger.info("[{}] -> GET, getAllSongs, page:{}, items_per_page:{}", this.getClass(),page,items_per_page);
            return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON)
                    .body(songService.getSongs(page, items_per_page));
        }
        else
            throw new UnauthorizedException("Not authorized");
    }

    @GetMapping(params = {"page"})
    @Operation(summary = "Retrieve all songs but using a paginated view by specifying only the page, items per page being implicitly 1.")
    public ResponseEntity<CollectionModel<SongDto>> getAllSongsImplicitItemPerPage
            (@RequestParam int page,
             @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {

        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager")
                || authorizeComponent.authorize(authorizationHeader.split(" ")[1], "artist")
                || authorizeComponent.authorize(authorizationHeader.split(" ")[1], "client")) {
            logger.info("[{}] -> GET, getAllSongsImplicitItemPerPage, page:{}", this.getClass(),page);
            return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON)
                    .body(songService.getSongs(page, 1));
        }
        else
            throw new UnauthorizedException("Not authorized");
    }

    @GetMapping()
    @Operation(summary = "Gets a list of all the songs. This is not secure because the songs can be accessed by everyone.")
    public ResponseEntity<List<SongDto>> getSongs() {
        logger.info("[{}] -> GET, getSongs", this.getClass());
        return new ResponseEntity<>(songService.getAllSongs(), new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping(params = {"genre"})
    @Operation(summary = "Gets a list of songs by a specific genre.")
    public ResponseEntity<List<SongDto>> getSongsByGenre(@RequestParam(value = "genre") String genre,
                                                         @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager")
                || authorizeComponent.authorize(authorizationHeader.split(" ")[1], "artist")
                || authorizeComponent.authorize(authorizationHeader.split(" ")[1], "client")) {
            logger.info("[{}] -> GET, getSongsByGenre, genre:{}", this.getClass(),genre);
            List<SongDto> songs = songService.getSongsByGenre(genre);
            if (songs.size() > 0)
                return new ResponseEntity<>(songs, new HttpHeaders(), HttpStatus.OK);
            else
                throw new ResourceNotFoundException("Resource not found");
        } else
            throw new UnauthorizedException("Not authorized");
    }

    @GetMapping(params = {"title", "match"})
    @Operation(summary = "Gets a list of songs by title with an exact match.")
    public ResponseEntity<List<SongDto>> getSongByTitle(@RequestParam(value = "title", required = true) String title,
                                                        @RequestParam(value = "match", required = false) String match,
                                                        @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager")
                || authorizeComponent.authorize(authorizationHeader.split(" ")[1], "artist")
                || authorizeComponent.authorize(authorizationHeader.split(" ")[1], "client")) {
            logger.info("[{}] -> GET, getSongByTitle, title:{}", this.getClass(),title);
            if (match.equals("exact")) {
                List<SongDto> songs = songService.getSongByTitle(title);
                if (songs.size() > 0) {
                    return new ResponseEntity<>(songs, new HttpHeaders(), HttpStatus.OK);
                } else
                    throw new ResourceNotFoundException("Resource not found");
            } else {
                return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.BAD_REQUEST);
            }
        } else
            throw new UnauthorizedException("Not authorized");
    }

    @GetMapping(params = {"title"})
    @Operation(summary = "Gets a list of songs by title with partial match.")
    public ResponseEntity<List<SongDto>> getSongByPartialTitle(@RequestParam(value = "title") String title,
                                                               @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager")
                || authorizeComponent.authorize(authorizationHeader.split(" ")[1], "artist")
                || authorizeComponent.authorize(authorizationHeader.split(" ")[1], "client")) {
            logger.info("[{}] -> GET, getSongByPartialTitle, title:{}", this.getClass(),title);
            List<SongDto> songs = songService.getSongByPartialTitle(title);
            if (songs.size() > 0)
                return new ResponseEntity<>(songService.getSongByPartialTitle(title),
                        new HttpHeaders(), HttpStatus.OK);
            else throw new ResourceNotFoundException("Resource not found");
        } else
            throw new UnauthorizedException("Not authorized");
    }

    @GetMapping(params = {"year"})
    @Operation(summary = "Gets all songs by a certain release date.")
    public ResponseEntity<List<SongDto>> getSongByYear(@RequestParam(value = "year") String year,
                                                       @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager")
                || authorizeComponent.authorize(authorizationHeader.split(" ")[1], "artist")
                || authorizeComponent.authorize(authorizationHeader.split(" ")[1], "client")) {
            logger.info("[{}] -> GET, getSongByYear, year:{}", this.getClass(),year);
            List<SongDto> songs = songService.getSongsByYearOfRelease(year);
            if (songs.size() > 0)
                return new ResponseEntity<>(songService.getSongsByYearOfRelease(year),
                        new HttpHeaders(), HttpStatus.OK);
            else throw new ResourceNotFoundException("Resource not found");
        } else throw new UnauthorizedException("Not authorized");
    }

    @PostMapping("/add_song")
    @Operation(summary = "Adds a new song to the database.")
    public ResponseEntity<SongDto> addSong(@Valid @RequestBody SongDto songDto,
                                           @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (songDto.getId() != 0 || songDto.getType() == null || songDto.getDuration() == null || songDto.getLanguage() == null
                || songDto.getTitle() == null || songDto.getReleaseDate() == null)
            throw new NotAcceptableException("Not acceptable"); //the id must be processed by the server
        //we just want to add a new resource, not update id, so the id
        //should not be present
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager")
                || authorizeComponent.authorize(authorizationHeader.split(" ")[1], "artist")) {
            logger.info("[{}] -> POST, addSong, song:{}", this.getClass(),songDto);
            SongDto song = songService.addSong(songDto);
            if (song != null)
                return new ResponseEntity<>(song,
                        new HttpHeaders(), HttpStatus.CREATED);
            else throw new NotAcceptableException("Not acceptable");
        } else throw new UnauthorizedException("Not authorized");
    }

    @PutMapping("/update_title")
    @Operation(summary = "Update the title of a song")
    public ResponseEntity<String> updateSongTitle(@Valid @RequestBody UpdateTitleRequest request, BindingResult bindingResult,
                                                  @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (request.getId() == null || request.getTitle() == null || bindingResult.hasErrors())
            throw new NotAcceptableException("Not acceptable");
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager")
                || authorizeComponent.authorize(authorizationHeader.split(" ")[1], "artist")) {
            logger.info("[{}] -> PUT, updateSongTitle, request:{}", this.getClass(),request);
            Boolean response = songService.changeSongTitle(request.getId(), request.getTitle());
            if (response)
                return new ResponseEntity<>("Updated", new HttpHeaders(), HttpStatus.OK);
            else
                throw new ResourceNotFoundException("Resource not found");
        } else throw new UnauthorizedException("Not authorized");
    }

    @PutMapping("/update_language")
    @Operation(summary = "Update song language")
    public ResponseEntity<String> updateSongLanguage(@Valid @RequestBody UpdateLanguageRequest request,
                                                     BindingResult bindingResult,
                                                     @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (request.getId() == null || request.getLanguage() == null || bindingResult.hasErrors())
            throw new NotAcceptableException("Not acceptable");
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager")
                || authorizeComponent.authorize(authorizationHeader.split(" ")[1], "artist")) {
            logger.info("[{}] -> PUT, updateSongLanguage, request:{}", this.getClass(),request);
            Boolean response = songService.changeSongLanguage(request.getId(), request.getLanguage());
            if (response)
                return new ResponseEntity<>("Updated", new HttpHeaders(), HttpStatus.OK);
            else
                throw new ResourceNotFoundException("Resource not found");
        } else throw new UnauthorizedException("Not authorized");
    }

    @PutMapping("/update_genre")
    @Operation(summary = "Update song genre")
    public ResponseEntity<String> updateSongGenre(@Valid @RequestBody UpdateSongGenre request,
                                                  BindingResult bindingResult,
                                                  @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (request.getId() == null || request.getGenre() == null || bindingResult.hasErrors())
            throw new NotAcceptableException("Not acceptable");
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager")
                || authorizeComponent.authorize(authorizationHeader.split(" ")[1], "artist")) {
            logger.info("[{}] -> PUT, updateSongGenre, request:{}", this.getClass(),request);
            Boolean response = songService.changeSongGenre(request.getId(), request.getGenre());
            if (response)
                return new ResponseEntity<>("Updated", new HttpHeaders(), HttpStatus.OK);
            else
                throw new ResourceNotFoundException("Resource not found");
        } else throw new UnauthorizedException("Not authorized");
    }

    @PutMapping("/update_song")
    @Operation(summary = "Update a song")
    public ResponseEntity<String> updateSong(@Valid @RequestBody SongDto songDto,
                                             BindingResult bindingResult,
                                             @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (songDto.getId() == null || songDto.getGenre() == null || songDto.getDuration() == null
                || songDto.getLanguage() == null || songDto.getTitle() == null
                || songDto.getReleaseDate() == null || bindingResult.hasErrors())
            throw new NotAcceptableException("Not acceptable");
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager")
                || authorizeComponent.authorize(authorizationHeader.split(" ")[1], "artist")) {
            logger.info("[{}] -> PUT, updateSong, song:{}", this.getClass(),songDto);
            Boolean response = songService.changeSong(songDto);
            if (response)
                return new ResponseEntity<>("Updated", new HttpHeaders(), HttpStatus.OK);
            else
                throw new ResourceNotFoundException("Resource not found");
        } else throw new UnauthorizedException("Not authorized");
    }

    @DeleteMapping("/delete_song/{id}")
    @Operation(summary = "Delete a song by id")
    public ResponseEntity<Void> deleteSong(@PathVariable Integer id,
                                           @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager")) {
            logger.info("[{}] -> DELETE, deleteSong, id:{}", this.getClass(),id);
            boolean deleted = songService.deleteSong(id);
            if (deleted)
                return new ResponseEntity<>(new HttpHeaders(), HttpStatus.NO_CONTENT);
            else throw new ResourceNotFoundException("Resource not found");
        } else throw new UnauthorizedException("Not authorized");
    }
}
