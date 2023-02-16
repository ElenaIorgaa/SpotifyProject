package com.spotify.project.models;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.ArrayList;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Document(collection = "playlists")
public class Playlist {
    @MongoId
    @Field("_id")
    private ObjectId _id;

    @Field("playlistName")
    private String playlistName;

    @Field("userId")
    private Integer userId;

    @Field("numberOfRequests")
    private Integer numberOfRequests;

    @Field("songs")
    private ArrayList<Song> songs;

    public Playlist(String playlistName, Integer userId) {
        super();
        this.playlistName = playlistName;
        this.userId = userId;
        this.numberOfRequests = 0;
        this.songs = new ArrayList<>();
    }


}
