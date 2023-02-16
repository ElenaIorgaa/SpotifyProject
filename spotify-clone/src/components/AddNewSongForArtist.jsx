import React from "react";
import styled from "styled-components";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

export default function AddNewSongForArtist() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [language, setLanguage] = useState("");
  const [releasedate, setReleasedate] = useState("");
  const [genre, setGenre] = useState("");
  const [type, setType] = useState("song");
  const [
    {
      token,
      users,
      users_page,
      edit_user,
      selected_user,
      add_new_user,
      content_manager,
      edit_song,
      add_new_song,
      artists_page,
      add_new_artist,
      artist,
      current_artist_id,
      add_new_song2,
      id_song,
      client,
    },
    dispatch,
  ] = useStateProvider();
  const handleChange = (event) => {
    setType(event.target.value); // Set the value of the state variable to the selected value
  };
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
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const id_song = data["id"];
        dispatch({ type: reducerCases.SET_ID_SONG, id_song });
        console.log("PPPPPPPPPPPPPPPP" + data["id"]);
        console.log("ID SONG " + id_song);
        console.log("ARTIST ID " + current_artist_id);
        fetch(
          `http://127.0.0.1:8093/api/songcollection/${id_song}/add_song/${current_artist_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log("PPPPPPPPPPPPPPPP" + data["id"]);
            setTitle("");
            setReleasedate("");
            setLanguage("");
            setGenre("");
            setDuration("");
          });
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
      {/* <span>
        <label>Release date</label>
        <DatePicker
          selected={releasedate}
          onChange={(date) => setReleasedate(date)}
        />
      </span> */}

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
