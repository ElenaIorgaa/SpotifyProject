package com.spotify.project.repositories;

import com.spotify.project.models.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, String> {
    @Query(value = "SELECT * from artists WHERE id = ?1",nativeQuery = true)
    Artist getArtistById(String id);
    @Query(value = "SELECT * from artists WHERE BINARY first_name = ?1",nativeQuery = true)
    List<Artist> getArtistsByFirstName(String firstName);
    @Query(value = "SELECT * from artists WHERE last_name = ?1",nativeQuery = true)
    List<Artist> getArtistsByLastName(String lastName);

}
