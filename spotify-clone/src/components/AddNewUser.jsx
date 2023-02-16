import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

export default function AddNewUser() {
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
      add_new_song2,
      client,
      add_new_playlist,
      edit_playlist,
    },
    dispatch,
  ] = useStateProvider();
  const [usernme, setUsernme] = useState("");
  const [passwrd, setPasswrd] = useState("");
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
  const AddUser = () => {
    checkToken();
    const admin = false;
    const users_page = false;
    const songs_page = false;
    const edit_user = false;
    const content_manager = false;
    const add_new_song = false;
    const artists_page = false;
    const add_new_artist = false;
    const artist = false;
    const add_new_song2 = false;
    const client = false;
    const add_new_playlist = false;
    const edit_playlist = false;
    dispatch({ type: reducerCases.SET_EDIT_PLAYLIST, edit_playlist });
    dispatch({ type: reducerCases.SET_ADD_NEW_PLAYLIST, add_new_playlist });
    dispatch({ type: reducerCases.SET_CLIENT, client });
    dispatch({ type: reducerCases.SET_ADD_NEW_SONG2, add_new_song2 });
    dispatch({ type: reducerCases.SET_ARTIST, artist });
    dispatch({ type: reducerCases.SET_ADD_NEW_ARTIST, add_new_artist });
    dispatch({ type: reducerCases.SET_ARTISTS_PAGE, artists_page });
    dispatch({ type: reducerCases.SET_ADD_NEW_SONG, add_new_song });

    const add_new_user = true;
    dispatch({ type: reducerCases.SET_ADMIN, admin });
    dispatch({ type: reducerCases.SET_USERS_PAGE, users_page });

    dispatch({ type: reducerCases.SET_SONGS_PAGE, songs_page });
    dispatch({ type: reducerCases.SET_EDIT_USER, edit_user });
    dispatch({ type: reducerCases.SET_CONTENT_MANAGER, content_manager });

    const edit_song = false;
    dispatch({ type: reducerCases.SET_EDIT_SONG, edit_song });

    console.log("S H O U L D  W O R K ");

    dispatch({ type: reducerCases.SET_ADD_NEW_USER, add_new_user });
    const endpoint = "http://127.0.0.1:8000";
    const payload = `
    <soap11env:Envelope 
    xmlns:soap11env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sample="services.users.soap">
        <soap11env:Body>
            <sample:register_user>
                <sample:username>${usernme}</sample:username>
                <sample:password>${passwrd}</sample:password>
            </sample:register_user>
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
        setUsernme("");
        setPasswrd("");
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
        <label style={{ fontWeight: "bold" }}>Username </label>
        <input
          type="text"
          name="username"
          value={usernme}
          onChange={(e) => setUsernme(e.target.value)}
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
          marginTop: "10px",
        }}
      >
        <label style={{ fontWeight: "bold" }}>Password </label>
        <input
          type="password"
          name="password"
          value={passwrd}
          onChange={(e) => setPasswrd(e.target.value)}
          style={{
            height: "30px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid gray",
            marginBottom: "20px",
          }}
        />
      </div>
      <button onClick={AddUser}>Submit</button>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;
  img {
    height: 20vh;
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
