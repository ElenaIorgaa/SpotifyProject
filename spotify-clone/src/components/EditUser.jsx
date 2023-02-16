import React from "react";
import { useStateProvider } from "../utils/StateProvider";
import styled from "styled-components";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { useState } from "react";
import { reducerCases } from "../utils/Constants";

export default function EditUser() {
  const [
    {
      token,
      users,
      users_page,
      edit_user,
      selected_user,
      add_new_user,
      content_manager,
    },
    dispatch,
  ] = useStateProvider();
  console.log("ar trebui sa mearga " + selected_user);

  const [newUsername, setNewUsername] = useState("");

  console.log("new username: " + newUsername);
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);
  const [isChecked6, setIsChecked6] = useState(false);
  const [isChecked7, setIsChecked7] = useState(false);
  const [isChecked8, setIsChecked8] = useState(false);
  const [isChecked9, setIsChecked9] = useState(false);

  const handleChange = () => {
    console.log(isChecked);
    setIsChecked(!isChecked);
  };

  const handleChange2 = () => {
    console.log(isChecked2);
    setIsChecked2(!isChecked2);
  };
  const handleChange3 = () => {
    console.log(isChecked3);
    setIsChecked3(!isChecked3);
  };
  const handleChange4 = () => {
    console.log(isChecked4);
    setIsChecked4(!isChecked4);
  };
  const handleChange5 = () => {
    console.log(isChecked5);
    setIsChecked5(!isChecked5);
  };
  const handleChange6 = () => {
    console.log(isChecked6);
    setIsChecked6(!isChecked6);
  };
  const handleChange7 = () => {
    console.log(isChecked7);
    setIsChecked7(!isChecked7);
  };
  const handleChange8 = () => {
    console.log(isChecked8);
    setIsChecked8(!isChecked8);
  };
  const handleChange9 = () => {
    console.log(isChecked9);
    setIsChecked9(!isChecked9);
  };

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
        setNewUsername("");
        if (responseText.includes("Token is expired")) {
          window.location = undefined;
          const token = "";
          dispatch({ type: reducerCases.SET_TOKEN, token });
          localStorage.setItem("token", "");
        }
      });
  };
  const changeUsername = () => {
    const endpoint = "http://127.0.0.1:8000";

    const payload = `
    <soap11env:Envelope 
    xmlns:soap11env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sample="services.users.soap">
        <soap11env:Body>
            <sample:update_user_username>
                <sample:id>${selected_user[0]}</sample:id>
                 <sample:new_username>${newUsername}</sample:new_username>
            </sample:update_user_username>
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
        setNewUsername("");
      });
  };
  const ValidateOrInvalidate = () => {
    checkToken();
    const endpoint = "http://127.0.0.1:8000";

    console.log("got here 0");
    var payload;
    if (isChecked) {
      payload = `
    <soap11env:Envelope 
xmlns:soap11env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sample="services.users.soap">
    <soap11env:Body>
        <sample:adm_validate_user>
            <sample:id>${selected_user[0]}</sample:id>
        </sample:adm_validate_user>
    </soap11env:Body>
</soap11env:Envelope>
        `;
    } else {
      payload = `
    <soap11env:Envelope 
xmlns:soap11env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sample="services.users.soap">
    <soap11env:Body>
        <sample:adm_invalidate_user>
            <sample:id>${selected_user[0]}</sample:id>
        </sample:adm_invalidate_user>
    </soap11env:Body>
</soap11env:Envelope>
        `;
    }
    const headers = {
      "Content-Type": "text/xml",
      SOAPAction: "http://example.com/soap/service/login",
      Authorization: "Bearer " + token,
    };
    fetch(endpoint, { method: "POST", headers: headers, body: payload })
      .then((response) => response.text())
      .then((responseText) => {
        console.log(responseText);
        setNewUsername("");
      });
  };

  const AddUserRole = () => {
    checkToken();
    const endpoint = "http://127.0.0.1:8000";

    console.log("got here 0");
    var payload;

    if (isChecked2) {
      console.log("numele userului ar trebu isa fie " + selected_user[1]);
      payload = `
      <soap11env:Envelope 
      xmlns:soap11env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sample="services.users.soap">
          <soap11env:Body>
              <sample:add_user_role>
                  <sample:id>${selected_user[0]}</sample:id>
                  <sample:rol>client</sample:rol>
              </sample:add_user_role>
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
          setNewUsername("");
        });
    }
    if (isChecked3) {
      payload = `
                          <soap11env:Envelope 
                xmlns:soap11env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sample="services.users.soap">
                    <soap11env:Body>
                        <sample:add_user_role>
                            <sample:id>${selected_user[0]}</sample:id>
                            <sample:rol>administrator_aplicatie</sample:rol>
                        </sample:add_user_role>
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
          setNewUsername("");
        });
    }

    if (isChecked4) {
      payload = `
           <soap11env:Envelope 
              xmlns:soap11env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sample="services.users.soap">
                  <soap11env:Body>
                        <sample:add_user_role>
                           <sample:id>${selected_user[0]}</sample:id>
                           <sample:rol>artist</sample:rol>
                         </sample:add_user_role>
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
          setNewUsername("");
        });
    }

    if (isChecked5) {
      payload = `
             <soap11env:Envelope 
                xmlns:soap11env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sample="services.users.soap">
                    <soap11env:Body>
                          <sample:add_user_role>
                             <sample:id>${selected_user[0]}</sample:id>
                             <sample:rol>content_manager</sample:rol>
                           </sample:add_user_role>
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
          setNewUsername("");
        });
    }
  };

  const RemoveUserRole = () => {
    checkToken();
    const endpoint = "http://127.0.0.1:8000";

    console.log("got here 0");
    var payload;

    if (isChecked6) {
      console.log("numele userului ar trebu isa fie " + selected_user[1]);
      payload = `
      <soap11env:Envelope 
xmlns:soap11env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sample="services.users.soap">
    <soap11env:Body>
        <sample:remove_role_by_username>
            <sample:id>${selected_user[0]}</sample:id>
            <sample:role>client</sample:role>
        </sample:remove_role_by_username>
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
          setNewUsername("");
        });
    }
    if (isChecked7) {
      payload = `
      <soap11env:Envelope 
      xmlns:soap11env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sample="services.users.soap">
          <soap11env:Body>
              <sample:remove_role_by_username>
                  <sample:id>${selected_user[0]}</sample:id>
                  <sample:role>administrator_aplicatie</sample:role>
              </sample:remove_role_by_username>
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
          setNewUsername("");
        });
    }

    if (isChecked8) {
      payload = `
      <soap11env:Envelope 
      xmlns:soap11env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sample="services.users.soap">
          <soap11env:Body>
              <sample:remove_role_by_username>
                  <sample:id>${selected_user[0]}</sample:id>
                  <sample:role>artist</sample:role>
              </sample:remove_role_by_username>
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
          setNewUsername("");
        });
    }

    if (isChecked9) {
      payload = `
      <soap11env:Envelope 
      xmlns:soap11env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sample="services.users.soap">
          <soap11env:Body>
              <sample:remove_role_by_username>
                  <sample:id>${selected_user[0]}</sample:id>
                  <sample:role>content_manager</sample:role>
              </sample:remove_role_by_username>
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
          setNewUsername("");
        });
    }
  };

  return (
    <Container>
      <h1 style={{ fontWeight: "bold", color: "darkgreen" }}>
        Current username : {selected_user[1]}{" "}
      </h1>
      <div></div>
      <label style={{ fontWeight: "bold" }}>Edit username: </label>
      <input
        type="text"
        name="username"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        style={{
          height: "30px",
          width: "20%",
          borderRadius: "5px",
          border: "1px solid gray",
        }}
      />
      <button onClick={changeUsername} type="submit">
        Change username
      </button>
      <h1 style={{ fontWeight: "bold", color: "darkgreen" }}>
        Current validation status : {selected_user[2]}{" "}
      </h1>
      <div></div>
      <label style={{ fontWeight: "bold" }}>Edit validated: </label>
      Validate:
      <input
        type="radio"
        value="validated"
        name="valid"
        checked={isChecked}
        onClick={handleChange}
      />
      <button type="submit" onClick={ValidateOrInvalidate}>
        Submit validate/invalidate
      </button>
      <h1 style={{ fontWeight: "bold", color: "darkgreen" }}>
        Current roles : {selected_user[3]}{" "}
      </h1>
      <div></div>
      <label style={{ fontWeight: "bold" }}>Add role: </label>
      Client:
      <input
        type="radio"
        value="client"
        name="client"
        checked={isChecked2}
        onClick={handleChange2}
      />
      Administrator aplicatie:
      <input
        type="radio"
        value="admin"
        name="admin"
        checked={isChecked3}
        onClick={handleChange3}
      />
      Artist:
      <input
        type="radio"
        value="artist"
        name="artist"
        checked={isChecked4}
        onClick={handleChange4}
      />
      Content manager:
      <input
        type="radio"
        value="cm"
        name="cm"
        checked={isChecked5}
        onClick={handleChange5}
      />
      <button type="submit" onClick={AddUserRole}>
        Add user role
      </button>
      <div></div>
      <label style={{ fontWeight: "bold" }}>Remove role: </label>
      Client:
      <input
        type="radio"
        value="clientRem"
        name="clientRem"
        checked={isChecked6}
        onClick={handleChange6}
      />
      Administrator aplicatie:
      <input
        type="radio"
        value="adminRem"
        name="adminRem"
        checked={isChecked7}
        onClick={handleChange7}
      />
      Artist:
      <input
        type="radio"
        value="artistRem"
        name="artistRem"
        checked={isChecked8}
        onClick={handleChange8}
      />
      Content manager:
      <input
        type="radio"
        value="cmRem"
        name="cmRem"
        checked={isChecked9}
        onClick={handleChange9}
      />
      <button type="submit" onClick={RemoveUserRole}>
        Remove client role
      </button>
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
