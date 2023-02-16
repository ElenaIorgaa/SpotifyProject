import React from "react";
import styled from "styled-components";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

export default function AddNewArtist() {
  const [uuid, setUuid] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [nationality, setNationality] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [{ token }, dispatch] = useStateProvider();

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
  const AddSong = () => {
    checkToken();

    const payload = {
      uuid: uuid,
      first_name: first_name,
      last_name: last_name,
      nationality: nationality,
      birthDate: birthDate,
    };
    fetch("http://127.0.0.1:8088/api/songcollection/artists/add_artist", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <label style={{ fontWeight: "bold" }}>Uuid </label>
        <input
          type="text"
          name="uuid"
          value={uuid}
          onChange={(e) => setUuid(e.target.value)}
          style={{
            height: "30px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid gray",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <label style={{ fontWeight: "bold" }}>First name </label>
        <input
          type="text"
          name="first_name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          style={{
            height: "30px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid gray",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <label style={{ fontWeight: "bold" }}>Last name </label>
        <input
          type="text"
          name="last_name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          style={{
            height: "30px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid gray",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <label style={{ fontWeight: "bold" }}>Nationality </label>
        <input
          type="text"
          name="nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          style={{
            height: "30px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid gray",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <label style={{ fontWeight: "bold" }}>Birthdate </label>
        <input
          type="text"
          name="birthdate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          style={{
            height: "30px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid gray",
          }}
        />
      </div>
      <button onClick={AddSong}>Add song/album</button>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  transform: translate(-200px, 0px);
  width: 100vw;
  background-color: #1db954;
  gap: 1rem;
  img {
    height: 20vh;
  }
  button:hover {
    color: green;
    background-color: lightgreen;
  }
  button {
    padding: 1rem 1rem;
    border-radius: 5rem;
    background-color: black;
    color: #49f585;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;
