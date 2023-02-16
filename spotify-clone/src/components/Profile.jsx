import React from "react";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import { useState } from "react";

export default function Profile() {
  const [newPassword, setNewPassword] = useState("");
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
      edit_playlist,
      token,
      user_profile,
      current_user,
    },
    dispatch,
  ] = useStateProvider();
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
  const handleClick = () => {
    checkToken();
    const endpoint = "http://127.0.0.1:8000";
    const payload = `
    <soap11env:Envelope 
xmlns:soap11env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sample="services.users.soap">
    <soap11env:Body>
        <sample:update_user_password>
            <sample:id>${current_user.split("id:")[1].split(",")[0]}</sample:id>
             <sample:password>${newPassword}</sample:password>
        </sample:update_user_password>
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
      });
  };
  const goBack = () => {
    checkToken();
    const admin = false;
    dispatch({ type: reducerCases.SET_ADMIN, admin });
    const songs_page = false;
    const users_page = false;
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
    const user_profile = false;
    dispatch({ type: reducerCases.SET_USER_PROFILE, user_profile });
    dispatch({ type: reducerCases.SET_EDIT_PLAYLIST, edit_playlist });
    dispatch({ type: reducerCases.SET_ADD_NEW_PLAYLIST, add_new_playlist });
    dispatch({ type: reducerCases.SET_CLIENT, client });
    dispatch({ type: reducerCases.SET_ADD_NEW_SONG2, add_new_song2 });
    dispatch({ type: reducerCases.SET_ARTIST, artist });
    dispatch({ type: reducerCases.SET_ADD_NEW_ARTIST, add_new_artist });
    dispatch({ type: reducerCases.SET_ARTISTS_PAGE, artists_page });
    dispatch({ type: reducerCases.SET_ADD_NEW_SONG, add_new_song });
    dispatch({ type: reducerCases.SET_SONGS_PAGE, songs_page });
    dispatch({ type: reducerCases.SET_USERS_PAGE, users_page });
    dispatch({ type: reducerCases.SET_EDIT_USER, edit_user });
    const add_new_user = false;
    dispatch({ type: reducerCases.SET_ADD_NEW_USER, add_new_user });
    dispatch({ type: reducerCases.SET_CONTENT_MANAGER, content_manager });
    const edit_song = false;
    dispatch({ type: reducerCases.SET_EDIT_SONG, edit_song });
  };

  return (
    <Container>
      <label
        style={{ fontWeight: "bold", transform: "translate(-200px,50px)" }}
      >
        Change password:
      </label>
      <input
        type="text"
        name="title"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={{
          height: "30px",
          width: "20%",
          borderRadius: "5px",
          border: "1px solid gray",
          transform: "translate(-150px,0px)",
        }}
      />
      <button
        onClick={handleClick}
        style={{
          transform: "translate(-150px,-50px)",
        }}
      >
        Change password
      </button>
      {/*<button onClick={addNewContentManager}>Add new content manager</button> */}
      <button
        onClick={goBack}
        style={{
          transform: "translate(-150px,-100px)",
        }}
      >
        Back
      </button>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;
  img {
    height: 20vh;
  }
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    background-color: black;
    color: #49f585;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
    transform: translate(-120px, 50px);
  }
  button:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;
