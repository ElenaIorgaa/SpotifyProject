package com.spotify.project.controllers;

import com.spotify.project.components.authorize.AuthorizeComponent;
import com.spotify.project.dtos.ArtistDto;
import com.spotify.project.components.mappers.ArtistMapper;
import com.spotify.project.components.assemblers.ArtistModelAssembler;
import com.spotify.project.exceptions.requests.NotAcceptableException;
import com.spotify.project.services.ArtistService;
import com.spotify.project.exceptions.requests.ResourceNotFoundException;
import com.spotify.project.exceptions.requests.UnauthorizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.MediaTypes;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static org.hibernate.internal.CoreLogging.logger;

@RestController
@RequestMapping("/api/songcollection/artists")
@Tag(name = "artists")
public class ArtistController {
    @Autowired
    private AuthorizeComponent authorizeComponent;
    @Autowired
    private ArtistService artistService;
    @Autowired
    private PagedResourcesAssembler<ArtistDto> pagedResourcesAssembler;

    @Autowired
    private ArtistModelAssembler artistModelAssembler;

    private final Logger logger = LoggerFactory.getLogger(ArtistController.class);

    public ArtistController(ArtistService artistService, ArtistMapper artistMapperService) {
        super();
    }

    @GetMapping
    @Operation(summary = "Retrieve all the artists.")
    public ResponseEntity<List<ArtistDto>> getAllArtists
            (@RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager") ||
                authorizeComponent.authorize(authorizationHeader.split(" ")[1], "client")) {
            logger.info("[{}] -> GET, getAllArtists", this.getClass());
            return new ResponseEntity<>(artistService.getAllArtists(), new HttpHeaders(), HttpStatus.OK);
        } else
            throw new UnauthorizedException("Not authorized");
    }

    @GetMapping("/{uuid}")
    @Operation(summary = "Retrieve an artist by id.")
    public ResponseEntity<ArtistDto> getArtistById(@PathVariable String uuid,
                                                   @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager")) {
            logger.info("[{}] -> GET, getArtistById, uuid:{}", this.getClass(),uuid);
            return artistService.getArtistById(uuid)
                    .map(value -> new ResponseEntity<>(value, new HttpHeaders(), HttpStatus.OK))
                    .orElseThrow(() -> new ResourceNotFoundException("Not found"));
        } else
            throw new UnauthorizedException("Not authorized");
    }

    @GetMapping(params = {"lastname"})
    @Operation(summary = "Retrieve a list of artists by their last name.")
    public ResponseEntity<List<ArtistDto>> getArtistsByLastName(@RequestParam(value = "lastname") String lastName,
                                                                @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager") ||
                authorizeComponent.authorize(authorizationHeader.split(" ")[1], "client")) {
            logger.info("[{}] -> GET, getArtistsByLastName, lastname:{}", this.getClass(),lastName);
            List<ArtistDto> artists = artistService.getArtistsByLastName(lastName);
            if (artists.size() > 0)
                return new ResponseEntity<>(artistService.getArtistsByLastName(lastName), new HttpHeaders(), HttpStatus.OK);
            else
                throw new ResourceNotFoundException("Not found");
        } else
            throw new UnauthorizedException("Not authorized");
    }

    @GetMapping(params = {"page", "items_per_page"})
    @Operation(summary = "Retrieve all the artists but using a paginated view where you need to specify page and items per page.")
    public ResponseEntity<CollectionModel<ArtistDto>> getAllArtists(@RequestParam int page,
                                                                    @RequestParam int items_per_page,
                                                                    @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {

        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager") ||
                authorizeComponent.authorize(authorizationHeader.split(" ")[1], "client")) {
            logger.info("[{}] -> GET, getAllArtists, page:{}, items_per_page:{}", this.getClass(), page, items_per_page);
            return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON)
                    .body(artistService.getArtists(page, items_per_page));
        } else
            throw new UnauthorizedException("Not authorized");
    }

    @GetMapping(params = {"page"})
    @Operation(summary = "Retrieve all the artists but using a paginated view where you need to specify page but items per page is implicitly 1.")
    public ResponseEntity<CollectionModel<ArtistDto>> getAllArtistsWithImplicitItemsPerPage(@RequestParam int page,
                                                                                            @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager") ||
                authorizeComponent.authorize(authorizationHeader.split(" ")[1], "client")) {
            logger.info("[{}] -> GET, getAllArtistsWithImplicitItemsPerPage, page:{}", this.getClass(), page);
            return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON)
                    .body(artistService.getArtists(page, 1));
        } else
            throw new UnauthorizedException("Not authorized");
    }

    @GetMapping(params = {"firstname", "match"})
    @Operation(summary = "Retrieves all artists by first name with an exact match.")
    public ResponseEntity<List<ArtistDto>> getArtistByName(@RequestParam(value = "firstname") String firstname,
                                                           @RequestParam(value = "match", required = false) String match,
                                                           @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager") ||
                authorizeComponent.authorize(authorizationHeader.split(" ")[1], "client")) {
            logger.info("[{}] -> GET, getArtistByName, firstName:{}, match:{}", this.getClass(), firstname, match);
            if (match.equals("exact")) {
                return new ResponseEntity<>(artistService.getArtistsByFirstName(firstname), new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.BAD_REQUEST);
            }
        } else
            throw new UnauthorizedException("Not authorized");
    }

    @GetMapping(params = {"firstname"})
    @Operation(summary = "Retrieves all artists by first name with partial match.")
    public ResponseEntity<List<ArtistDto>> getSongByPartialTitle(@RequestParam(value = "firstname", required = true) String firstname,
                                                                 @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager") ||
                authorizeComponent.authorize(authorizationHeader.split(" ")[1], "client")) {
            logger.info("[{}] -> GET, getSongByPartialTitle, firstName:{}", this.getClass(), firstname);
            return new ResponseEntity<>(artistService.getArtistByPartialFirstName(firstname),
                    new HttpHeaders(), HttpStatus.OK);
        } else
            throw new UnauthorizedException("Not authorized");
    }

    @PutMapping("/add_artist")
    @Operation(summary = "Adds or updates an artist.")
    public ResponseEntity<ArtistDto> addArtistToGroup(@Valid @RequestBody ArtistDto artistDto,
                                                      BindingResult bindingResult,
                                                      @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (bindingResult.hasErrors() || artistDto.getUuid() == null || artistDto.getBirthDate() == null
                || artistDto.getNationality() == null || artistDto.getLastName() == null || artistDto.getFirstName() == null)
            throw new NotAcceptableException("Not acceptable");
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager")) {
            logger.info("[{}] -> PUT, addArtistToGroup, artist:{}", this.getClass(), artistDto);
            return new ResponseEntity<>(artistService.addArtist(artistDto), new HttpHeaders(), HttpStatus.CREATED);
        } else
            throw new UnauthorizedException("Not authorized");
    }

    @DeleteMapping("/delete_artist/{uuid}")
    @Operation(summary = "Deletes an artist.")
    public ResponseEntity<ArtistDto> deleteArtist(@PathVariable String uuid,
                                                  @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (authorizeComponent.authorize(authorizationHeader.split(" ")[1], "content_manager")) {
            logger.info("[{}] -> DELETE, deleteArtist, uuid:{}", this.getClass(), uuid);
            boolean deleted = artistService.deleteArtist(uuid);
            if (deleted)
                return new ResponseEntity<>(new HttpHeaders(), HttpStatus.NO_CONTENT);
            else throw new ResourceNotFoundException("Resource not found");
        } else throw new UnauthorizedException("Not authorized");
    }

}
