import React, { useEffect, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import styled from "styled-components";
export default function Client() {
  const [{ id, setId }] = useState("");
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
      roles,
      current_user,
      token,
      current_song,
      playlists,
      edit_playlist,
      user_profile,
    },
    dispatch,
  ] = useStateProvider();
  //   const [{ roles, dispatchRoles }] = useStateProvider();
  //   const [{ id, dispatchId }] = useStateProvider();
  //   const [{ playlists, dispatchPlaylists }] = useStateProvider();
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
      checkToken();
      console.log(roles);
      if (roles.includes("client")) {
        // setId(current_user.split("id:")[1].split(",")[0]);
        const response = await axios.get(
          `http://127.0.0.1:8088/playlists/get_all_playlists/${
            current_user.split("id:")[1].split(",")[0]
          }`,
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

  const onClickAdd = () => {
    checkToken();
    dispatch({ type: reducerCases.SET_CURRENT_SONG, current_song });
    const artists_page = false;
    dispatch({ type: reducerCases.SET_ARTISTS_PAGE, artists_page });
    const users_page = false;
    const admin = false;
    const songs_page = false;
    const content_manager = false;
    const artist = false;
    const add_new_song2 = false;
    const client = false;
    const add_new_playlist = true;
    const edit_playlist = false;
    const user_profile = false;
    dispatch({ type: reducerCases.SET_USER_PROFILE, user_profile });
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

  const onClick = ({ id, playlistName, numberOfRequests, songs, userId }) => {
    checkToken();
    const current_playlist = [];
    current_playlist[0] = id;
    current_playlist[1] = playlistName;
    current_playlist[2] = numberOfRequests;
    current_playlist[3] = songs;
    current_playlist[4] = userId;
    const add_new_artist = false;
    const artist = false;
    const add_new_song2 = false;
    const client = false;
    const add_new_playlist = false;
    const edit_playlist = true;
    const user_profile = false;
    dispatch({ type: reducerCases.SET_USER_PROFILE, user_profile });
    dispatch({ type: reducerCases.SET_EDIT_PLAYLIST, edit_playlist });
    dispatch({ type: reducerCases.SET_ADD_NEW_PLAYLIST, add_new_playlist });
    dispatch({ type: reducerCases.SET_CLIENT, client });
    dispatch({ type: reducerCases.SET_ADD_NEW_SONG2, add_new_song2 });
    dispatch({ type: reducerCases.SET_ARTIST, artist });
    dispatch({ type: reducerCases.SET_ADD_NEW_ARTIST, add_new_artist });
    dispatch({ type: reducerCases.SET_CURRENT_PLAYLIST, current_playlist });
    const artists_page = false;
    dispatch({ type: reducerCases.SET_ARTISTS_PAGE, artists_page });
    const users_page = false;
    const admin = false;
    const songs_page = false;
    const content_manager = false;
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
      <div className="playlist">
        {playlists.map(
          ({ id, playlistName, numberOfRequests, songs, userId }) => (
            <div key={id} className="song">
              <h1
                className="title"
                title="Edit playlist"
                onClick={() =>
                  onClick({ id, playlistName, numberOfRequests, songs, userId })
                }
              >
                {playlistName}
              </h1>
              Songs:
              <p className="description">
                {songs.map(({ songId, title, self }) => (
                  <p key={songId} className="song">
                    <p>{title}</p>
                  </p>
                ))}
              </p>
            </div>
          )
        )}
      </div>
      <button onClick={onClickAdd}>Add new playlist</button>
    </Container>
  );
}

const Container = styled.div`
  p {
    color: white;
  }
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    background-color: black;
    color: #49f585;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
    position: absolute;
    transform: translate(400px, 0px);
  }
  button:hover {
    color: green;
    background-color: lightgreen;
  }
  .title {
    color: darkgreen;
  }
  .title:hover {
    color: lightgreen;
  }
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    color: green;
    gap: 2rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }
  .list {
    .header-row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      margin: 1rem 0 0 0;
      color: #dddcdc;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ headerBackground }) =>
        headerBackground ? "#000000dc" : "none"};
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
            width: 40px;
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
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
`;
