import React, { useEffect } from "react";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import axios from "axios";

const url = "http://127.0.0.1:8088";
export default function Body() {
  return (
    <Container>
      <h1> WELCOME</h1>
      <img
        src="https://i.insider.com/4e1eeadc4bd7c819791b0000?width=750&format=jpeg&auto=webp"
        alt="spotify"
      />
    </Container>
  );
}
const Container = styled.div`
  h1 {
    text-align: center;
    color: green;
  }
  img {
    transform: translate(400px, 50px);
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
