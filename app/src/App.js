import "./App.css";
import { useState } from "react";
import SignUp from "./SignUp.js";
import Login from "./Login.js";

function App() {
  const [mostra, setMostra] = useState(0);
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [us, setUs] = useState("");
  const [e, setE] = useState("");
  const [d, setD] = useState("");

  async function disponi(response) {
    setId(response.id);
    setUs(response.username);
    setE(response.email);
    setD(response.reg_date);
  }

  async function getInfo(token) {
    const response = await fetch(`http://localhost:8080/user/${token}`, {
      method: "GET",
    });
    const array = await response.json();
    disponi(array);
    setToken(token);
  }

  return (
    <div className="App">
      {token === "" ? (
        <>
          <SignUp mostra={mostra} setMostra={setMostra} />
          <hr />
          <Login mostra={mostra} setMostra={setMostra} getInfo={getInfo} />
        </>
      ) : (
        <>
          <div className="">
            <p>ID: {id}</p>
            <p>Username: {us}</p>
            <p>Email: {e}</p>
            <p>Data Registrazione: {d}</p>
            <p>Token: {token}</p>
          </div>
          <button onClick={() => setToken("")}>TORNA INDIETRO</button>
        </>
      )}
    </div>
  );
}

export default App;
