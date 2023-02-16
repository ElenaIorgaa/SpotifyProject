package com.spotify.project.repositories;

import com.spotify.project.models.ArtistSong;
import com.spotify.project.models.compositekey.ArtistSongId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ArtistSongRepository extends JpaRepository<ArtistSong, ArtistSongId> {

    @Query(value = "SELECT * from artist_song WHERE song_id = ?1 ;", nativeQuery = true)
    List<ArtistSong> getBySongId(int userId);

    @Query(value = "SELECT * from artist_song WHERE artist_uuid = ?1 ;", nativeQuery = true)
    List<ArtistSong> getByArtistId(String artistUuid);

    @Transactional
    @Modifying
    @Query(value = "DELETE from artist_song WHERE song_id = ?1 ;", nativeQuery = true)
    void deleteSongArtistBySong(Integer songId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM artist_song WHERE artist_uuid = ?1 ;", nativeQuery = true)
    void deleteSongArtistByArtist(String uuid);

    @Transactional
    @Modifying
    @Query(value = "DELETE from artist_song WHERE song_id = ?1 AND artist_uuid = ?2 ;", nativeQuery = true)
    void deleteSongArtist(Integer id, String uuid);
}
