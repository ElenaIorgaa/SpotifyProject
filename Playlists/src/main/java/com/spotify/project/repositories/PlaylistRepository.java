package com.spotify.project.repositories;

import com.spotify.project.models.Playlist;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

@Qualifier("playlistRepository")
public interface PlaylistRepository extends MongoRepository<Playlist, String> {
    @Query("{playlistName:'?0'}")
    List<Playlist> findPlaylistByName(String playlistName);

    @Query("{userId:'?0'}")
    List<Playlist> findPlaylistByUserId(int userId);

}
