import React, { useEffect } from "react";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import styled from "styled-components";
import decodeJwt from "./decodeJwt";
import axios from "axios";

export default function Users() {
  const [
    {
      token,
      users,
      users_page,
      edit_user,
      selected_user,
      songs_page,
      add_new_user,
      content_manager,
      artists_page,
      add_new_song2,
      client,
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
  const handleClickUser = ({ id, username, validated, roles }) => {
    checkToken();
    const edit_user = true;
    const selected_user = [];
    selected_user[0] = id + " ";
    selected_user[1] = username + " ";
    selected_user[2] = validated + " ";
    selected_user[3] = roles + " ";
    dispatch({ type: reducerCases.SET_EDIT_USER, edit_user });
    dispatch({ type: reducerCases.SET_SELECTED_USER, selected_user });

    const users_page = false;
    const admin = false;
    const songs_page = false;
    const content_manager = false;
    const artists_page = false;
    const add_new_song2 = false;
    const client = false;
    const edit_playlist = false;
    const user_profile = false;
    dispatch({ type: reducerCases.SET_USER_PROFILE, user_profile });
    dispatch({ type: reducerCases.SET_EDIT_PLAYLIST, edit_playlist });
    dispatch({ type: reducerCases.SET_CLIENT, client });
    dispatch({ type: reducerCases.SET_ADD_NEW_SONG2, add_new_song2 });
    dispatch({ type: reducerCases.SET_ARTISTS_PAGE, artists_page });
    dispatch({ type: reducerCases.SET_CONTENT_MANAGER, content_manager });
    dispatch({ type: reducerCases.SET_USERS_PAGE, users_page });
    dispatch({ type: reducerCases.SET_ADMIN, admin });
    dispatch({ type: reducerCases.SET_SONGS_PAGE, songs_page });
    const add_new_user = false;
    dispatch({ type: reducerCases.SET_ADD_NEW_USER, add_new_user });
  };
  const handleClick = () => {
    checkToken();
    const endpoint = "http://127.0.0.1:8000";

    console.log("got here 0");
    const payload = `
        <soap11env:Envelope
        xmlns:soap11env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sample="services.users.soap">
            <soap11env:Body>
                <sample:getusers></sample:getusers>
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
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(responseText, "text/xml");
        const users = [];

        var arr = Array.prototype.slice.call(
          xmlDoc.getElementsByTagName("tns:string")
        );

        console.log(arr[0]["textContent"]);
        var i = 0;
        while (arr[i] != undefined) {
          const array = arr[i]["textContent"].split(",");
          const id = array[0].split(":")[1];

          const username = array[1].split(":")[1];
          const validated = array[2].split(":")[1];

          const roles = [];
          const rolesString = arr[i]["textContent"].split("roles:")[1];
          const rolesArray = rolesString.split(" ");
          console.log(rolesArray[0]);
          var k = 0;
          while (rolesArray[k] !== undefined) {
            roles[k] = rolesArray[k].split("value:")[1];
            console.log(roles[k]);
            k = k + 1;
          }
          users[i] = { id, username, roles, validated };
          i = i + 1;
        }
        dispatch({ type: reducerCases.SET_USERS, users });
      });
  };

  return (
    <Container>
      <button onClick={handleClick} className="button">
        REFRESH
      </button>
      <div className="song-grid">
        {users.map(({ id, username, validated, roles }) => (
          <div key={id}>
            <H1
              onClick={() =>
                handleClickUser({ id, username, validated, roles })
              }
              title="Edit user"
              className="song"
            >
              {username}
            </H1>
            <p>Validated: {validated}</p>
            <p>Roles: {roles}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
const H1 = styled.h1`
  color: darkgreen;
  &:hover {
    color: lightgreen;
  }
`;
const Container = styled.div`
  color: #b3b3b3;
  height: 100%;
  overflow: hidden;
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    background-color: black;
    color: #49f585;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
  }
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 100vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    .song-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 300px);
      grid-gap: 40px;
    }

    .song {
      background-color: green;
      border-radius: 5px;
      padding: 20px;
    }
    h1::hover {
      color: white;
    }
    li {
      transition: 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        color: white;
      }
    }
  }
`;
