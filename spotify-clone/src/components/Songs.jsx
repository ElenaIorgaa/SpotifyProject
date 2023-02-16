import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import axios from "axios";

const url = "http://127.0.0.1:8088";
export default function Songs() {
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [
    {
      token,
      songs,
      current_song,
      users,
      users_page,
      edit_user,
      selected_user,
      songs_page,
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
  useEffect(() => {
    const getSongs = async () => {
      checkToken();
      const response = await axios.get(
        `http://127.0.0.1:8088/api/songcollection/songs?page=${pageNumber}&items_per_page=${itemsPerPage}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const songs = [];
      var i = 0;
      while (response.data["_embedded"]["songDtoes"][i] != undefined) {
        const id = response.data["_embedded"]["songDtoes"][i]["id"];
        const title = response.data["_embedded"]["songDtoes"][i]["title"];
        const duration = response.data["_embedded"]["songDtoes"][i]["duration"];
        const language = response.data["_embedded"]["songDtoes"][i]["language"];
        const releaseDate =
          response.data["_embedded"]["songDtoes"][i]["releaseDate"];
        const genre = response.data["_embedded"]["songDtoes"][i]["genre"];
        const type = response.data["_embedded"]["songDtoes"][i]["type"];
        const links = response.data["_embedded"]["songDtoes"][i]["links"];
        songs[i] = {
          id,
          title,
          duration,
          language,
          releaseDate,
          genre,
          type,
          links,
        };
        i = i + 1;
      }
      dispatch({ type: reducerCases.SET_SONGS, songs });
    };
    getSongs();
  }, [token, dispatch]);

  const onClick = ({ song }) => {
    checkToken();
    const current_song = [];
    current_song[0] = song.id;
    current_song[1] = song.title;
    current_song[2] = song.duration;
    current_song[3] = song.language;
    current_song[4] = song.release_date;
    current_song[5] = song.genre;
    current_song[6] = song.type;
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
    dispatch({ type: reducerCases.SET_CURRENT_SONG, current_song });
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

    const edit_song = true;
    dispatch({ type: reducerCases.SET_EDIT_SONG, edit_song });
    const add_new_song = false;
    dispatch({ type: reducerCases.SET_ADD_NEW_SONG, add_new_song });
  };

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
    const add_new_playlist = false;
    const user_profile = false;
    dispatch({ type: reducerCases.SET_USER_PROFILE, user_profile });
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
    const add_new_song = true;
    dispatch({ type: reducerCases.SET_ADD_NEW_SONG, add_new_song });
  };

  const onClick2 = () => {
    const getSongs = async () => {
      checkToken();
      const response = await axios.get(
        `http://127.0.0.1:8088/api/songcollection/songs?page=${pageNumber}&items_per_page=${itemsPerPage}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const songs = [];
      var i = 0;
      while (response.data["_embedded"]["songDtoes"][i] != undefined) {
        const id = response.data["_embedded"]["songDtoes"][i]["id"];
        const title = response.data["_embedded"]["songDtoes"][i]["title"];
        const duration = response.data["_embedded"]["songDtoes"][i]["duration"];
        const language = response.data["_embedded"]["songDtoes"][i]["language"];
        const releaseDate =
          response.data["_embedded"]["songDtoes"][i]["releaseDate"];
        const genre = response.data["_embedded"]["songDtoes"][i]["genre"];
        const type = response.data["_embedded"]["songDtoes"][i]["type"];
        const links = response.data["_embedded"]["songDtoes"][i]["links"];
        songs[i] = {
          id,
          title,
          duration,
          language,
          releaseDate,
          genre,
          type,
          links,
        };
        i = i + 1;
      }
      dispatch({ type: reducerCases.SET_SONGS, songs });
    };
    getSongs();
  };

  return (
    <Container>
      <div className="playlist">
        {songs.map((song) => (
          <div key={song.id} className="song">
            <h1
              className="title"
              title="Edit song"
              onClick={() => onClick({ song })}
            >
              {song.title}
            </h1>
            <p className="description">Duration: {song.duration}</p>
            <p>Language: {song.language}</p>
            <p>Release Date: {song.releaseDate}</p>
            <p>Genre: {song.genre}</p>
            <p>Type: {song.type}</p>
          </div>
        ))}
      </div>
      <button onClick={onClickAdd}>Add new song</button>
      <p style={{ color: "white" }}>Page number:</p>
      <input
        type="text"
        name="uname"
        required
        onChange={(e) => setPageNumber(e.target.value)}
        style={{
          height: "30px",
          width: "5%",
          borderRadius: "5px",
          border: "1px solid gray",
          // transform: "translate(0px, 80px)",
        }}
      />
      <p style={{ color: "white" }}>Items per page:</p>
      <input
        type="text"
        name="uname"
        required
        onChange={(e) => {
          setItemsPerPage(e.target.value);
        }}
        style={{
          height: "30px",
          width: "5%",
          borderRadius: "5px",
          border: "1px solid gray",
          // transform: "translate(0px, 80px)",
        }}
      />
      <button onClick={onClick2} style={{ transform: "translate(0px, 70px)" }}>
        Display
      </button>
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
