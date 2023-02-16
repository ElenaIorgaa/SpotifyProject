package com.spotify.project.services;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.spotify.project.components.assemblers.PlaylistAssembler;
import com.spotify.project.components.mappers.PlaylistMapper;
import com.spotify.project.dtos.PlaylistDto;
import com.spotify.project.models.Playlist;
import com.spotify.project.repositories.PlaylistRepository;
import com.spotify.project.models.Song;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.ws.client.core.WebServiceTemplate;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlaylistService {
    @Autowired
    @Qualifier("playlistRepository")
    private PlaylistRepository playlistRepository;

    private final RestTemplate restTemplate;

    @Autowired
    private WebServiceTemplate webServiceTemplate;

    @Autowired
    private PlaylistAssembler playlistAssembler;
    @Autowired
    private PlaylistMapper playlistMapper;
    @Autowired
    private PagedResourcesAssembler<Playlist> pagedResourcesAssembler;

    public PlaylistService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

//    public List<JsonObject> getAllSongs() {
//
//        String url = "http://127.0.0.1:8093/api/songcollection/songs";
//        JSONArray jsonArray = this.restTemplate.getForObject(url, JSONArray.class);
//        assert jsonArray != null;
//        Gson gson = new Gson();
//        return jsonArray.stream()
//                .map(value -> JsonParser.parseString(gson.toJson(value)).getAsJsonObject())
//                .collect(Collectors.toList());
//    }

    public PlaylistDto createPlaylist(String name, Integer userId) throws ParserConfigurationException, IOException, SAXException {
        String url = "http://127.0.0.1:8000";
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/soap+xml; charset=utf-8");
        String xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                "<soap11env:Envelope\n" +
                "        xmlns:soap11env=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:sample=\"services.users.soap\">\n" +
                "    <soap11env:Body>\n" +
                "        <sample:getusers></sample:getusers>\n" +
                "    </soap11env:Body>\n" +
                "</soap11env:Envelope>";
        System.out.println(xml);

        con.setDoOutput(true);
        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.writeBytes(xml);
        wr.flush();
        wr.close();
        String responseStatus = con.getResponseMessage();
        System.out.println(responseStatus);
        BufferedReader in = new BufferedReader(new InputStreamReader(
                con.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
        System.out.println("response:" + response.toString());
        Playlist playlist = new Playlist(name, userId);
        List<Playlist> playlists = playlistRepository.findAll();
        if (response.toString().contains("id:" + userId) &&
                !(playlists.stream().map(Playlist::getUserId).collect(Collectors.toList()).contains(userId) &&
                        playlists.stream().map(Playlist::getPlaylistName).collect(Collectors.toList()).contains(name)))
            return playlistMapper.mapToDto(playlistRepository.save(playlist));
        else return null;
    }

    public PlaylistDto addSongToPlaylist(Integer songId, String playlistName, String token) throws Exception {
        String url = String.format("http://127.0.0.1:8093/api/songcollection/songs/%d", songId);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer "+token);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        JSONObject obj = restTemplate.exchange(url, HttpMethod.GET, entity, JSONObject.class).getBody();
        //JSONObject obj = restTemplate.getForEntity(url, JSONObject.class).getBody();
        Song song;
        assert obj != null;
        if (obj.size() == 0)
            throw new Exception("Object is null");
        else
            song = new Song(Integer.parseInt(obj.getAsString("id")), obj.getAsString("title")
                    , new URL(obj.getAsString("_links")
                    .split("href")[1]
                    .replace("=", "")
                    .split(",")[0]));
        Playlist playlist = playlistRepository.findPlaylistByName(playlistName).get(0);
        if (playlist == null)
            throw new Exception("No such playlist in repository");
        else {
            if (!playlist.getSongs().contains(song))
                playlist.getSongs().add(song);
        }
        return playlistMapper.mapToDto(playlistRepository.save(playlist));
    }

    public List<PlaylistDto> findPlaylistsByUserId(Integer userId) {
        List<Playlist> playlists = playlistRepository.findAll();
        List<Playlist> foundPlaylistsByUserId = new ArrayList<>();
        for (Playlist playlist : playlists) {
            if (Objects.equals(playlist.getUserId(), userId))
                foundPlaylistsByUserId.add(playlist);
        }
        return foundPlaylistsByUserId.stream()
                .map(playlist -> playlistMapper.mapToDto(playlist))
                .collect(Collectors.toList());
    }

    public List<PlaylistDto> getAllPlaylists() {
        return playlistRepository.findAll().stream()
                .map(playlist -> playlistMapper.mapToDto(playlist))
                .collect(Collectors.toList());
    }

    public PlaylistDto changePlaylistTitle(String playlistName, String newp) {
        List<Playlist> playlists = playlistRepository.findPlaylistByName(playlistName);
        if (playlists.size() >= 1) {
            Playlist playlist = playlistRepository.findPlaylistByName(playlistName).get(0);
            if (playlist != null) {
                playlist.setPlaylistName(newp);
                return playlistMapper.mapToDto(playlistRepository.save(playlist));
            }
        }
        return null;
    }

    public PlaylistDto getPlaylistById(String id) {
        return playlistRepository.findById(id)
                .map(value -> playlistMapper.mapToDto(value)).orElse(null);
    }

    public boolean deletePlaylistById(String id) {
        if (playlistRepository.findById(id).isPresent()) {
            playlistRepository.deleteById(id);
            return true;
        } else return false;
    }

    public CollectionModel<PlaylistDto> getPlaylistsPaginated(int page, int size) {
        return pagedResourcesAssembler.toModel(playlistRepository.findAll(PageRequest.of(page, size))
                , playlistAssembler);
    }
}
