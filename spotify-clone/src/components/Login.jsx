import styled from "styled-components";
import React, { useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

export default function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  const [token, setToken] = useState(null);
  const [{ users, current_user }, dispatch] = useStateProvider();

  const endpoint = "http://127.0.0.1:8000";
  const headers = {
    "Content-Type": "text/xml",
    SOAPAction: "http://example.com/soap/service/login",
  };
  const database = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };
  const handleClick = (event) => {
    event.preventDefault();

    var { uname, pass } = document.forms[0];
    console.log("got here 0");
    const payload = `
      <soap11env:Envelope
    xmlns:soap11env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sample="services.users.soap">
        <soap11env:Body>
            <sample:login>
                <sample:username>${uname.value}</sample:username>
                <sample:password>${pass.value}</sample:password>
            </sample:login>
        </soap11env:Body>
    </soap11env:Envelope>
    `;
    console.log("got here 1");
    fetch(endpoint, { method: "POST", headers: headers, body: payload })
      .then((response) => response.text())
      .then((responseText) => {
        console.log(responseText);
        if (responseText.includes("Successful")) {
          let parser = new DOMParser();
          let xmlDoc = parser.parseFromString(responseText, "text/xml");

          let xpathResult = xmlDoc.evaluate(
            "//tns:loginResult/text()",
            xmlDoc,
            (prefix) => {
              if (prefix === "tns") {
                return "services.users.soap";
              }
              return null;
            },
            XPathResult.STRING_TYPE,
            null
          );
          let loginResult = xpathResult.stringValue;
          setToken(loginResult.substring("Successful :".length).trim());
          localStorage.setItem("token", token.toString());
          console.log("The token is: " + token);
          if (localStorage.getItem("token") != null)
            window.location.href = "spotify";
        } else {
          setErrorMessages({ name: "pass", message: errors.pass });
        }
      });
  };
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
  return (
    <Container>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
        alt="spotify"
      />

      <form onSubmit={handleClick} style={{ width: "400px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <label style={{ fontWeight: "bold" }}>Username </label>
          <input
            type="text"
            name="uname"
            required
            style={{
              height: "30px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid gray",
            }}
          />
          {renderErrorMessage("uname")}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginTop: "10px",
          }}
        >
          <label style={{ fontWeight: "bold" }}>Password </label>
          <input
            type="password"
            name="pass"
            required
            style={{
              height: "30px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid gray",
              marginBottom: "20px",
            }}
          />
          {renderErrorMessage("pass")}
        </div>
        <button type="submit">Submit</button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
    position: absolute;
  }
`;
