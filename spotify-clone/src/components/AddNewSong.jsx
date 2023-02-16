import React from "react";
import styled from "styled-components";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

export default function AddNewSong() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [language, setLanguage] = useState("");
  const [releasedate, setReleasedate] = useState("");
  const [genre, setGenre] = useState("");
  const [type, setType] = useState("song");
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const [{ token }, dispatch] = useStateProvider();
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
  const AddSong = () => {
    checkToken();
    const payload = {
      title: title,
      duration: duration,
      language: language,
      releaseDate: releasedate,
      genre: genre,
      type: type.toUpperCase(),
    };
    console.log(JSON.stringify(payload));
    fetch("http://127.0.0.1:8088/api/songcollection/songs/add_song", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
        setTitle("");
        setReleasedate("");
        setLanguage("");
        setGenre("");
        setDuration("");
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
        <label style={{ fontWeight: "bold" }}>Title </label>
        <input
          type="text"
          name="username"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            height: "30px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid gray",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <label style={{ fontWeight: "bold" }}>Duration </label>
        <input
          type="text"
          name="username"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{
            height: "30px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid gray",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <label style={{ fontWeight: "bold" }}>Language </label>
        <input
          type="text"
          name="username"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            height: "30px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid gray",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <label style={{ fontWeight: "bold" }}>Release date </label>
        <input
          type="text"
          name="username"
          value={releasedate}
          onChange={(e) => setReleasedate(e.target.value)}
          style={{
            height: "30px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid gray",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <label style={{ fontWeight: "bold" }}>Genre </label>
        <input
          type="text"
          name="username"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={{
            height: "30px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid gray",
          }}
        />
      </div>

      <label style={{ fontWeight: "bold" }}>Type </label>

      <select value={type} onChange={handleChange}>
        <option value="SONG">Song</option>
        <option value="ALBUM">Album</option>
      </select>

      <button onClick={AddSong}>Add song/album</button>
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
