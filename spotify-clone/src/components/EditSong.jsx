import React from "react";
import { useStateProvider } from "../utils/StateProvider";
import styled from "styled-components";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { useState } from "react";
import { reducerCases } from "../utils/Constants";

export default function EditSong() {
  const [newTitle, setNewTitle] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [newGenre, setNewGenre] = useState("");
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
  return (
    <Container>
      <h1 style={{ fontWeight: "bold", color: "darkgreen" }}>
        Current song title : {current_song[1]}{" "}
      </h1>
      <div></div>
      <label style={{ fontWeight: "bold" }}>Edit title: </label>
      <input
        type="text"
        name="title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        style={{
          height: "30px",
          width: "20%",
          borderRadius: "5px",
          border: "1px solid gray",
        }}
      />
      <button type="submit">Change title</button>

      <h1 style={{ fontWeight: "bold", color: "darkgreen" }}>
        Current song duration : {current_song[2]}{" "}
      </h1>
      <div></div>
      <label style={{ fontWeight: "bold" }}>Edit duration: </label>
      <input
        type="text"
        name="duration"
        value={newDuration}
        onChange={(e) => setNewDuration(e.target.value)}
        style={{
          height: "30px",
          width: "20%",
          borderRadius: "5px",
          border: "1px solid gray",
        }}
      />
      <button type="submit">Change duration</button>

      <h1 style={{ fontWeight: "bold", color: "darkgreen" }}>
        Current language : {current_song[3]}{" "}
      </h1>
      <div></div>
      <label style={{ fontWeight: "bold" }}>Edit duration: </label>
      <input
        type="text"
        name="language"
        value={newLanguage}
        onChange={(e) => setNewLanguage(e.target.value)}
        style={{
          height: "30px",
          width: "20%",
          borderRadius: "5px",
          border: "1px solid gray",
        }}
      />
      <button type="submit">Change language</button>

      <h1 style={{ fontWeight: "bold", color: "darkgreen" }}>
        Current genre : {current_song[5]}{" "}
      </h1>
      <div></div>
      <label style={{ fontWeight: "bold" }}>Edit genre: </label>
      <input
        type="text"
        name="language"
        value={newGenre}
        onChange={(e) => setNewGenre(e.target.value)}
        style={{
          height: "30px",
          width: "20%",
          borderRadius: "5px",
          border: "1px solid gray",
        }}
      />
      <button type="submit">Change genre</button>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #1db954;
  height: 200vh;
  width: 100vw;
  transform: translate(-120px, 50px);
}
  button {
    border-radius: 5rem;
    background-color: black;
    color: #49f585;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;
