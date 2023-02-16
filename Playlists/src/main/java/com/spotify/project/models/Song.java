package com.spotify.project.models;

import javafx.scene.control.Hyperlink;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.net.URL;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Song {
    private Integer songId;
    private String title;
    private URL self;
}
