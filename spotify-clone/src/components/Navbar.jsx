import React from "react";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
export default function Navbar() {
  const [{ current_user, token, user_profile }, dispatch] = useStateProvider();
  const onClickLogout = () => {
    const endpoint = "http://127.0.0.1:8000";
    const payload = `
    <soap11env:Envelope 
    xmlns:soap11env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sample="services.users.soap">
        <soap11env:Body>
            <sample:logout></sample:logout>
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
        window.location = undefined;
        const token = "";
        dispatch({ type: reducerCases.SET_TOKEN, token });
        localStorage.setItem("token", "");
      });
  };

  const onClickProfile = () => {
    const user_profile = true;
    dispatch({ type: reducerCases.SET_USER_PROFILE, user_profile });
    const artists_page = false;
    dispatch({ type: reducerCases.SET_ARTISTS_PAGE, artists_page });
    const users_page = false;
    const admin = false;
    const songs_page = false;
    const content_manager = false;
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
    dispatch({ type: reducerCases.SET_CONTENT_MANAGER, content_manager });
    dispatch({ type: reducerCases.SET_USERS_PAGE, users_page });
    dispatch({ type: reducerCases.SET_ADMIN, admin });
    dispatch({ type: reducerCases.SET_SONGS_PAGE, songs_page });
    const add_new_user = false;
    dispatch({ type: reducerCases.SET_ADD_NEW_USER, add_new_user });
    const edit_user = false;
    dispatch({ type: reducerCases.SET_EDIT_USER, edit_user });

    const edit_song = false;
    dispatch({ type: reducerCases.SET_EDIT_SONG, edit_song });
    const add_new_song = false;
    dispatch({ type: reducerCases.SET_ADD_NEW_SONG, add_new_song });
  };

  return (
    <Container>
      <button onClick={onClickLogout}>Logout</button>
      <div className="avatar">
        <a href="#">
          <CgProfile />
          <span onClick={onClickProfile}>
            {current_user ? current_user.split(",")[1].split(":")[1] : ""}
          </span>
        </a>
      </div>
    </Container>
  );
}
const Container = styled.div`
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    background-color: black;
    color: #49f585;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
    transform: translate(0px, 0px);
  }
  button:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navBackground }) =>
    navBackground ? "rgba(0,0,0,0.7)" : "none"};
  .search__bar {
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;
