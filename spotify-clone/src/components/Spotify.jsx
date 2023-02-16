import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import Body from "./Body";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Admin from "./Admin";
import Users from "./Users";
import { useRef } from "react";
import { reducerCases } from "../utils/Constants";
import EditUser from "./EditUser";
import AddNewUser from "./AddNewUser";
import { ToastContainer, toast } from "react-toastify";
import Songs from "./Songs";
import ContentManager from "./ContentManager";
import EditSong from "./EditSong";
import AddNewSong from "./AddNewSong";
import Artists from "./Artists";
import AddNewArtist from "./AddNewArtist";
import Artist from "./Artist";
import AddNewSongForArtist from "./AddNewSongForArtist";
import Client from "./Client";
import AddNewPlaylist from "./AddNewPlaylist";
import EditPlaylist from "./EditPlaylist";
import decodeJwt from "./decodeJwt";
import Profile from "./Profile";

export default function Spotify() {
  const [
    {
      admin,
      users_page,
      edit_user,
      add_new_user,
      current_user,
      content_manager,
      songs_page,
      edit_song,
      add_new_song,
      artists_page,
      add_new_artist,
      artist,
      token,
      add_new_song2,
      client,
      add_new_playlist,
      edit_playlist,
      user_profile,
    },
    dispatch,
  ] = useStateProvider();

  useEffect(() => {
    if (current_user == null) {
      const endpoint = "http://127.0.0.1:8000";
      const payload = `
      <soap11env:Envelope 
      xmlns:soap11env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sample="services.users.soap">
          <soap11env:Body>
              <sample:get_current_user></sample:get_current_user>
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
          let parser = new DOMParser();
          let xmlDoc = parser.parseFromString(responseText, "text/xml");
          const current_use = xmlDoc.getElementsByTagName(
            "tns:get_current_userResult"
          );
          var arr = Array.prototype.slice.call(
            xmlDoc.getElementsByTagName("tns:string")
          );
          const current_user = current_use.item(0)["textContent"];
          dispatch({ type: reducerCases.SET_CURRENT_USER, current_user });
        });
      const jwt = decodeJwt(token);
      console.log("decoded: aici " + jwt["exp"]);
      const currentTime = Date.now() / 1000;
      if (currentTime > jwt["exp"]) {
        console.log("JWT is expired");
        window.location.href = "";
      } else {
        console.log("JWT is not expired");
      }
    }
  });
  return (
    <Container>
      <div className="spotify__body">
        <Sidebar />
        <div className="body">
          <Navbar />
          <ToastContainer />
          <div className="body__contents">
            {users_page ? (
              <Users />
            ) : songs_page ? (
              <Songs />
            ) : admin ? (
              <Admin />
            ) : edit_user ? (
              <EditUser />
            ) : add_new_user ? (
              <AddNewUser />
            ) : content_manager ? (
              <ContentManager />
            ) : add_new_song ? (
              <AddNewSong />
            ) : artists_page ? (
              <Artists />
            ) : edit_song ? (
              <EditSong />
            ) : add_new_song2 ? (
              <AddNewSongForArtist />
            ) : add_new_artist ? (
              <AddNewArtist />
            ) : client ? (
              <Client />
            ) : add_new_playlist ? (
              <AddNewPlaylist />
            ) : user_profile ? (
              <Profile />
            ) : edit_playlist ? (
              <EditPlaylist />
            ) : artist ? (
              <Artist />
            ) : (
              <Body />
            )}
            {/* <Body /> */}
          </div>
        </div>
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </Container>
  );
}
const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .spotify__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.7rem;
        max-height: 2rem;
        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
`;
