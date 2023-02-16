import styled from "styled-components";
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlists from "./Playlists";
import { Link } from "react-router-dom";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import admin from "../variables";
import React, { useState, useEffect } from "react";
import decodeJwt from "./decodeJwt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Sidebar() {
  //const [admin, setAdmin] = useState(false);
  //   const [{ admin, songs_list }, dispatch] = useStateProvider();
  const [
    {
      admin,
      songs_page,
      users_page,
      edit_user,
      add_new_user,
      token,
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
    const jwt = decodeJwt(token);
    console.log("am decodat " + jwt["role"]);
    if (jwt["role"].includes("administrator_aplicatie")) {
      const admin = true;
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
    } else {
      toast.info("You don't have the rights to do this !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleClickContentManager = () => {
    checkToken();
    const jwt = decodeJwt(token);
    console.log("am decodat " + jwt["role"]);
    if (jwt["role"].includes("content_manager")) {
      const admin = false;
      dispatch({ type: reducerCases.SET_ADMIN, admin });
      const songs_page = false;
      const users_page = false;
      const edit_user = false;
      const content_manager = true;
      const artists_page = false;
      const artist = false;
      const add_new_song = false;
      const add_new_artist = false;
      const add_new_song2 = false;
      const client = false;
      const add_new_playlist = false;
      const edit_playlist = false;
      const user_profile = false;
      dispatch({ type: reducerCases.SET_USER_PROFILE, user_profile });
      dispatch({ type: reducerCases.SET_EDIT_PLAYLIST, edit_playlist });
      dispatch({ type: reducerCases.SET_ADD_NEW_PLAYLIST, add_new_playlist });
      dispatch({ type: reducerCases.SET_CLIENT, client });
      dispatch({ type: reducerCases.SET_ADD_NEW_SONG2 });
      dispatch({ type: reducerCases.SET_ADD_NEW_ARTIST, add_new_artist });
      dispatch({ type: reducerCases.SET_ADD_NEW_SONG, add_new_song });
      dispatch({ type: reducerCases.SET_ARTIST, artist });
      dispatch({ type: reducerCases.SET_ARTISTS_PAGE, artists_page });
      dispatch({ type: reducerCases.SET_SONGS_PAGE, songs_page });
      dispatch({ type: reducerCases.SET_USERS_PAGE, users_page });
      dispatch({ type: reducerCases.SET_EDIT_USER, edit_user });
      const add_new_user = false;
      dispatch({ type: reducerCases.SET_ADD_NEW_USER, add_new_user });
      dispatch({ type: reducerCases.SET_CONTENT_MANAGER, content_manager });
    } else {
      toast.info("You don't have the rights to do this !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleClickArtist = () => {
    checkToken();
    const jwt = decodeJwt(token);
    if (jwt["role"].includes("artist")) {
      const admin = false;
      dispatch({ type: reducerCases.SET_ADMIN, admin });
      const songs_page = false;
      const users_page = false;
      const edit_user = false;
      const content_manager = false;
      const artists_page = false;
      const artist = true;
      const add_new_song = false;
      const add_new_artist = false;
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
      dispatch({ type: reducerCases.SET_ADD_NEW_ARTIST, add_new_artist });
      dispatch({ type: reducerCases.SET_ADD_NEW_SONG, add_new_song });
      dispatch({ type: reducerCases.SET_ARTIST, artist });
      dispatch({ type: reducerCases.SET_ARTISTS_PAGE, artists_page });
      dispatch({ type: reducerCases.SET_SONGS_PAGE, songs_page });
      dispatch({ type: reducerCases.SET_USERS_PAGE, users_page });
      dispatch({ type: reducerCases.SET_EDIT_USER, edit_user });
      const add_new_user = false;
      dispatch({ type: reducerCases.SET_ADD_NEW_USER, add_new_user });
      dispatch({ type: reducerCases.SET_CONTENT_MANAGER, content_manager });
    } else {
      toast.info("You don't have the rights to do this !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleClickClient = () => {
    checkToken();
    const jwt = decodeJwt(token);
    if (jwt["role"].includes("client")) {
      const admin = false;
      dispatch({ type: reducerCases.SET_ADMIN, admin });
      const songs_page = false;
      const users_page = false;
      const edit_user = false;
      const content_manager = false;
      const artists_page = false;
      const artist = false;
      const add_new_song = false;
      const add_new_artist = false;
      const add_new_song2 = false;
      const client = true;
      const add_new_playlist = false;
      const edit_playlist = false;
      const user_profile = false;
      dispatch({ type: reducerCases.SET_USER_PROFILE, user_profile });
      dispatch({ type: reducerCases.SET_EDIT_PLAYLIST, edit_playlist });
      dispatch({ type: reducerCases.SET_ADD_NEW_PLAYLIST, add_new_playlist });
      dispatch({ type: reducerCases.SET_CLIENT, client });
      dispatch({ type: reducerCases.SET_ADD_NEW_SONG2, add_new_song2 });
      dispatch({ type: reducerCases.SET_ADD_NEW_ARTIST, add_new_artist });
      dispatch({ type: reducerCases.SET_ADD_NEW_SONG, add_new_song });
      dispatch({ type: reducerCases.SET_ARTIST, artist });
      dispatch({ type: reducerCases.SET_ARTISTS_PAGE, artists_page });
      dispatch({ type: reducerCases.SET_SONGS_PAGE, songs_page });
      dispatch({ type: reducerCases.SET_USERS_PAGE, users_page });
      dispatch({ type: reducerCases.SET_EDIT_USER, edit_user });
      const add_new_user = false;
      dispatch({ type: reducerCases.SET_ADD_NEW_USER, add_new_user });
      dispatch({ type: reducerCases.SET_CONTENT_MANAGER, content_manager });
    } else {
      toast.info("You don't have the rights to do this !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <Container>
      <div className="top__links">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="spotify"
          />
        </div>
        <ul>
          <ToastContainer />
          <li onClick={handleClick}>
            <MdHomeFilled />
            <span>Admin</span>
          </li>
          {/* <li>
            <MdSearch />
            <span>Search</span>
          </li> */}
          <li onClick={handleClickContentManager}>
            <IoLibrary />
            <span>Content manager</span>
          </li>

          <li onClick={handleClickArtist}>
            <IoLibrary />
            <span>Artist</span>
          </li>

          <li onClick={handleClickClient}>
            <IoLibrary />
            <span>Client</span>
          </li>
        </ul>
      </div>
      {/* <Playlists /> */}
    </Container>
  );
}
const Container = styled.div`
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top__links {
    display: flex;
    flex-direction: column;
    .logo {
      text-align: center;
      margin: 1rem 0;
      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    }
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      li {
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: white;
        }
      }
    }
  }
`;
