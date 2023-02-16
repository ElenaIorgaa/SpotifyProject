import React from "react";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";

export default function Admin() {
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
    const admin = false;
    const users_page = true;
    const songs_page = false;
    const edit_user = false;
    const add_new_user = false;
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
    dispatch({ type: reducerCases.SET_ADMIN, admin });
    dispatch({ type: reducerCases.SET_USERS_PAGE, users_page });

    dispatch({ type: reducerCases.SET_SONGS_PAGE, songs_page });
    dispatch({ type: reducerCases.SET_EDIT_USER, edit_user });
    dispatch({ type: reducerCases.SET_ADD_NEW_USER, add_new_user });
    dispatch({ type: reducerCases.SET_CONTENT_MANAGER, content_manager });
    console.log("changed " + admin + " " + users_page);
    const edit_song = false;
    dispatch({ type: reducerCases.SET_EDIT_SONG, edit_song });
  };
  const addNewContentManager = () => {
    checkToken();
    const admin = false;
    const users_page = false;
    const songs_page = false;
    const edit_user = false;

    const add_new_user = true;
    const artist = false;
    const add_new_song2 = false;
    const client = false;
    const add_new_playlist = false;
    const user_profile = false;
    dispatch({ type: reducerCases.SET_USER_PROFILE, user_profile });
    dispatch({ type: reducerCases.SET_ADD_NEW_PLAYLIST, add_new_playlist });
    dispatch({ type: reducerCases.SET_CLIENT, client });
    dispatch({ type: reducerCases.SET_ADD_NEW_SONG2, add_new_song2 });
    dispatch({ type: reducerCases.SET_ARTIST, artist });
    dispatch({ type: reducerCases.SET_ADMIN, admin });
    dispatch({ type: reducerCases.SET_USERS_PAGE, users_page });

    dispatch({ type: reducerCases.SET_SONGS_PAGE, songs_page });
    dispatch({ type: reducerCases.SET_EDIT_USER, edit_user });

    console.log("S H O U L D  W O R K ");

    dispatch({ type: reducerCases.SET_ADD_NEW_USER, add_new_user });
  };
  const goBack = () => {
    checkToken();
    const admin = false;
    const users_page = false;
    const songs_page = false;
    const edit_user = false;

    const add_new_user = false;
    const add_new_artist = false;
    const artist = false;
    const add_new_song2 = false;
    const client = false;
    const add_new_playlist = false;
    const user_profile = false;
    dispatch({ type: reducerCases.SET_USER_PROFILE, user_profile });
    dispatch({ type: reducerCases.SET_ADD_NEW_PLAYLIST, add_new_playlist });
    dispatch({ type: reducerCases.SET_CLIENT, client });
    dispatch({ type: reducerCases.SET_ADD_NEW_SONG2 });
    dispatch({ type: reducerCases.SET_ARTIST, artist });
    dispatch({ type: reducerCases.SET_ADD_NEW_ARTIST, add_new_artist });
    dispatch({ type: reducerCases.SET_ADMIN, admin });
    dispatch({ type: reducerCases.SET_USERS_PAGE, users_page });

    dispatch({ type: reducerCases.SET_SONGS_PAGE, songs_page });
    dispatch({ type: reducerCases.SET_EDIT_USER, edit_user });

    console.log("S H O U L D  W O R K ");

    dispatch({ type: reducerCases.SET_ADD_NEW_USER, add_new_user });
  };

  return (
    <Container>
      <button onClick={handleClick}>Show all users</button>
      <button onClick={addNewContentManager}>Add new content manager</button>
      <button onClick={goBack}>Back</button>
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
