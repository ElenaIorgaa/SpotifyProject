import React from "react";
import { useStateProvider } from "../utils/StateProvider";
import styled from "styled-components";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { reducerCases } from "../utils/Constants";
import { useEffect } from "react";
import axios from "axios";
export default function EditPlaylist() {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [songId, setSongId] = useState(null);

  const [
    {
      token,
      songs,
      current_song,
      users,
      users_page,
      edit_user,
      selected_user,
      songs_page,
      add_new_user,
      content_manager,
      edit_song,
      current_playlist,
      playlists,
    },
    dispatch,
  ] = useStateProvider();
  const [playlistName, setPlaylistname] = useState(current_playlist[1]);
  const [newSongs, setNewSongs] = useState(current_playlist[3]);
  const checkToken = () => {
    const endpoint = "http://127.0.0.1:8000";
    const payload = `
    <soap11env:Envelope 
    xmlns:soap11env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sample="services.users.soap">
        <soap11env:Body>
            <sample:check_if_token_is_expired></sample:check_if_token_is_expired>
        </soap11env:Body>
    </soap11env:Envelope>
        `;
    const headers = {
      "Content-Type": "text/xml",
      SOAPAction: "http://example.com/soap/service/login",
      Authorization: "Bearer " + token,
    };
    fetch(endpoint, { method: "POST", headers: headers, body: payload })
      .then((response) => response.text())
      .then((responseText) => {
        console.log(responseText);
        if (responseText.includes("Token is expired")) {
          window.location = undefined;
          const token = "";
          dispatch({ type: reducerCases.SET_TOKEN, token });
          localStorage.setItem("token", "");
        }
      });
  };

  const getAvailableSongs = () => {
    checkToken();
    /*const response = axios.get(
      `http://127.0.0.1:8088/api/songcollection/songs`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const songs = [];
    var i = 0;
    console.log("RASPUNS " + response);
    while (response.data[i] != undefined) {
      const id = response.data[i]["id"];
      const title = response.data[i]["title"];
      const duration = response.data[i]["duration"];
      const language = response.data[i]["language"];
      const releaseDate = response.data[i]["releaseDate"];
      const genre = response.data[i]["genre"];
      const type = response.data[i]["type"];
      const links = response.data[i]["links"];
      var flag = false;
      console.log("DIMENSIUNEA " + current_playlist[3].length);
      for (let w = 0; w < current_playlist[3].length; w++) {
        console.log("---------------------------");
        console.log(current_playlist[3][w].title);
        console.log(title);
        if (current_playlist[3][w].title == title) {
          console.log("AM GASIT");
          flag = true;
        }
      }
      if (flag == false) {
        songs[i] = {
          id,
          title,
          duration,
          language,
          releaseDate,
          genre,
          type,
          links,
        };

        i = i + 1;
      }
    }
    dispatch({ type: reducerCases.SET_SONGS, songs });*/
    fetch("http://127.0.0.1:8088/api/songcollection/songs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(function (data) {
        const songs = [];
        console.log("####################### " + data);
        var i = 0;
        var j = 0;
        while (data[i] != undefined) {
          const id = data[i]["id"];
          const title = data[i]["title"];
          const duration = data[i]["duration"];
          const language = data[i]["language"];
          const releaseDate = data[i]["releaseDate"];
          const genre = data[i]["genre"];
          const type = data[i]["type"];
          const links = data[i]["links"];
          var flag = false;
          for (let w = 0; w < current_playlist[3].length; w++) {
            if (current_playlist[3][w].songId == id) {
              console.log("AM GASIT");
              flag = true;
            }
          }
          if (flag == false) {
            songs[j] = {
              id,
              title,
              duration,
              language,
              releaseDate,
              genre,
              type,
              links,
            };

            j = j + 1;
          }
          i = i + 1;
        }
        dispatch({ type: reducerCases.SET_SONGS, songs });
      });
  };

  const changePlaylistName = () => {
    checkToken();
    const endpoint = `http://127.0.0.1:8088/playlists/change_playlist_title/${playlistName}/${newPlaylistName}`;
    fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
        setNewPlaylistName("");
        setPlaylistname(newPlaylistName);
      });
  };

  const addNewSong = () => {
    checkToken();
    const endpointFindSong = `http://127.0.0.1:8088/api/songcollection/songs/?title=${newSongs}&match=exact`;
    fetch(endpointFindSong, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(function (data) {
        if (data[0] != undefined) {
          const endpoint = `http://127.0.0.1:8088/playlists/add_song/${data[0]["id"]}/to_playlist/${playlistName}`;
          fetch(endpoint, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then(function (data) {
              console.log(data);
              setNewSongs("");
              toast.success("Done!", {
                position: toast.POSITION.TOP_RIGHT,
              });
            });
        } else {
          toast.info("We don't have this song :(", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };
  return (
    <Container>
      <h1 style={{ fontWeight: "bold", color: "darkgreen" }}>
        Current playlist name: {playlistName}{" "}
      </h1>
      <div></div>
      <label style={{ fontWeight: "bold" }}>Edit playlist name: </label>
      <input
        type="text"
        name="title"
        value={newPlaylistName}
        onChange={(e) => setNewPlaylistName(e.target.value)}
        style={{
          height: "30px",
          width: "20%",
          borderRadius: "5px",
          border: "1px solid gray",
        }}
      />
      <button type="submit" onClick={changePlaylistName}>
        Change playlist name
      </button>

      <label style={{ fontWeight: "bold" }}>Add new song: </label>
      <input
        type="text"
        name="title"
        value={newSongs}
        onChange={(e) => setNewSongs(e.target.value)}
        style={{
          height: "30px",
          width: "20%",
          borderRadius: "5px",
          border: "1px solid gray",
        }}
      />
      <button type="submit" onClick={addNewSong}>
        Add song
      </button>

      <button type="submit" onClick={getAvailableSongs}>
        See available songs
      </button>
      <div style={{ color: "green" }}>
        {songs.map((song) => (
          <div key={song.id} className="song">
            <h1
              className="title"
              title="Edit song"
              //onClick={() => onClick({ song })}
            >
              {song.title}
            </h1>
            <p className="description">Duration: {song.duration}</p>
            <p>Language: {song.language}</p>
            <p>Release Date: {song.releaseDate}</p>
            <p>Genre: {song.genre}</p>
            <p>Type: {song.type}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  transform: translate(-200px, 0px);
  width: 100vw;
  gap: 1rem;
  img {
    height: 20vh;
  }
  button:hover {
    color: green;
    background-color: lightgreen;
  }
  button {
    padding: 1rem 1rem;
    border-radius: 5rem;
    background-color: black;
    color: #49f585;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;
