import React, { useEffect } from "react";
import Login from "./components/Login";
import { reducerCases } from "./utils/Constants";
import { useStateProvider } from "./utils/StateProvider";
import Spotify from "./components/Spotify";
import decodeJwt from "./components/decodeJwt";
export default function App(props) {
  const [{ token }, dispatch] = useStateProvider();
  const [{ id }, dispatchId] = useStateProvider();
  const [{ roles }, dispatchRole] = useStateProvider();
  useEffect(() => {
    const hash = window.location;

    console.log("this+" + hash);
    if (
      hash != undefined &&
      token != "" &&
      hash.toString().split("/")[3] != undefined &&
      hash != null
    )
      if (
        hash.toString().split("/")[3] != "" &&
        hash.toString().split("/")[3] != "undefined"
      ) {
        console.log("gets here " + hash.toString().split("/")[3]);
        //const token = hash.toString().split("/")[3];
        //console.log(token);
        const token = localStorage.getItem("token");
        //const token = props.Login.token;
        console.log("!!!!!!!!!!!!!!!! " + token);
        dispatch({ type: reducerCases.SET_TOKEN, token });
        console.log(decodeJwt(token));
        const id = decodeJwt(token)["sub"];
        const roles = decodeJwt(token)["role"];
        //dispatch({ type: reducerCases.SET_TOKEN, token });

        dispatch({ type: reducerCases.SET_TOKEN, token });
        dispatchId({ type: reducerCases.SET_USER_ID, id });
        dispatchRole({ type: reducerCases.SET_USER_ROLES, roles });
        console.log("NEW TOKEN " + token);
        console.log(id);
        console.log(roles);

        /*const currentTime = Math.floor(Date.now() / 1000);
        const jwt = decodeJwt(token);
        console.log("decoded " + jwt);*/

        /*if (jwt["exp"] < currentTime) {
          const toke = undefined;
          console.log("GETS HERERERERERERE");
          dispatch({ type: reducerCases.SET_TOKEN, toke });
        } else {
          console.log("Token is not expired");
          console.log(jwt["exp"]);
          console.log(currentTime);
        }*/
      }
    document.title = "Spotify";
  }, [token, dispatch]);
  return <div>{token ? <Spotify /> : <Login />}</div>;
}
