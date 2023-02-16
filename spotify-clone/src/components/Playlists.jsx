import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import styled from "styled-components";

export default function Playlists() {
  const [{ token, roles, id, playlists }, dispatch] = useStateProvider();
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
  useEffect(() => {
    const getPlaylistData = async () => {
      console.log(roles);
      if (roles.includes("client")) {
        checkToken();
        const response = await axios.get(
          "http://127.0.0.1:8088/playlists/get_all_playlists/" + id.toString(),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log("raspunsul: " + response.data[0]["id"]);
        const playlists = [];
        var i = 0;
        while (response.data[i] != undefined) {
          const id = response.data[i]["id"];
          const playlistName = response.data[i]["playlistName"];
          const numberOfRequests = response.data[i]["numberOfRequests"];
          const songs = response.data[i]["songs"];
          const userId = response.data[i]["userId"];
          playlists[i] = { id, playlistName, numberOfRequests, songs, userId };
          i = i + 1;
        }
        console.log(playlists);
        dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
      }
    };
    getPlaylistData();
  }, [token, dispatch]);
  return (
    <Container>
      <div className="playlist">
        {playlists.map(
          ({ id, playlistName, numberOfRequests, songs, userId }) => {
            <div key={id} className="song">
              <h1>{playlistName}</h1>;
              {songs.map((song) => (
                <p>{song.title}</p>
              ))}
            </div>;
          }
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  color: #b3b3b3;
  height: 100%;
  overflow: hidden;
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 55vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
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
