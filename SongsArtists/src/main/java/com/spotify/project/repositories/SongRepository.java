package com.spotify.project.repositories;

import com.spotify.project.models.Song;
import com.spotify.project.models.enums.SongType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Repository
public interface SongRepository extends JpaRepository<Song, Integer> {
    @Query(value = "SELECT * from songs WHERE title = ?1",nativeQuery = true)
    List<Song> getSongsByTitle(String title);

    @Query(value = "SELECT * from songs WHERE genre = ?1", nativeQuery = true)
    List<Song> getSongsByGenre(String genre);

    @Query(value = "select * from songs where year(release_date) = ?1 ;", nativeQuery = true)
    List<Song> getSongsByYear(String year);

    @Transactional
    @Modifying
    @Query(value = "UPDATE songs SET title = ?1 WHERE id = ?2 ;", nativeQuery = true)
    void changeSongTitle(String title, Integer id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE songs SET language = ?1 WHERE id = ?2", nativeQuery = true)
    void changeSongLanguage(String language, Integer id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE songs SET genre = ?1 WHERE id = ?2", nativeQuery = true)
    void changeSongGenre(String genre, Integer id);

    @Transactional
    @Modifying
    @Query(value="UPDATE songs SET title = ?1, duration = ?2, language = ?3, release_date = ?4, genre = ?5, type = ?6 where id = ?7 ;", nativeQuery = true)
    void updateSong(String title, Integer duration, String language, Date releaseDate, String genre, String type, Integer id);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM songs WHERE id = ?1 ;", nativeQuery = true)
    void deleteSongById(Integer id);
}
