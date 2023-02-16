import React from "react";
import styled from "styled-components";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

export default function AddNewPlaylist() {
  const [
    {
      admin,
      users_page,
      songs_page,
      edit_user,
      add_new_user,
      content_manager,
      edit_song,
      add_new_song,
      artists_page,
      add_new_artist,
      artist,
      add_new_song2,
      client,
      add_new_playlist,
      roles,
      current_user,
      token,
      current_song,
      playlists,
    },
    dispatch,
  ] = useStateProvider();
  const [playlistName, setPlaylistname] = useState("");
  const [userId, setUserId] = useState(
    current_user.split("id:")[1].split(",")[0]
  );
  const [numberOfRequests, setNumberOfRequests] = useState(1);
  const [songs, setSongs] = useState([]);

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

  const AddPlaylist = () => {
    checkToken();
    fetch(
      `http://127.0.0.1:8088/playlists/create_playlist/${userId}/${playlistName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
        setPlaylistname("");
      });
  };
  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <label style={{ fontWeight: "bold" }}>Playlist name </label>
        <input
          type="text"
          name="username"
          value={playlistName}
          onChange={(e) => setPlaylistname(e.target.value)}
          style={{
            height: "30px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid gray",
          }}
        />
      </div>

      <button onClick={AddPlaylist}>Add song/album</button>
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
  background-color: #1db954;
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
