package com.spotify.project.components.mappers;

import com.spotify.project.dtos.PlaylistDto;
import com.spotify.project.models.Playlist;
import org.springframework.stereotype.Component;

@Component
public class PlaylistMapper {
    public PlaylistDto mapToDto(Playlist playlist)
    {
        return new PlaylistDto(playlist.get_id(), playlist.getPlaylistName(), playlist.getUserId(),
                playlist.getNumberOfRequests(), playlist.getSongs());
    }
    public Playlist mapToModel(PlaylistDto playlistDto)
    {
        return new Playlist(playlistDto.getId(), playlistDto.getPlaylistName(), playlistDto.getUserId(),
                playlistDto.getNumberOfRequests(), playlistDto.getSongs());
    }
}
