import "./App.css";
import { useState } from "react";

function App({mostra, setMostra}) {
  const [status, setStatus] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);

  async function creaUtente() {
    
    const response = await fetch(`http://localhost:8080/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({"username": username, "password": password, "email": email}),
    });
    setMostra(0);
    setStatus(response);
    setShow(true);
  }

  function cambiaEmail(e){
    setEmail(e.target.value);
  }

  function cambiaUser(e){
    setUsername(e.target.value);
  }

  function cambiaPass(e){
    setPassword(e.target.value);
  }

  return (
    <div className="form">
      {mostra === 1 ? (
        <>
          <label>Email: </label>
          <input onChange={cambiaEmail} type="text" />
          <br/>
          <label>Username: </label>
          <input onChange={cambiaUser} type="text" />
          <br/>
          <label>Password: </label>
          <input onChange={cambiaPass} type="text" />
          <br/>
          <button onClick={creaUtente}>INVIA</button>
          <button onClick={() => setMostra(0)}>ANNULLA</button>
        </>
      ) : (
        <button onClick={() => {setMostra(1)}}>Sign Up</button>
      )}
      {
        show && <p>{status ? "registarzione eseguita con successo" : "errore nella registrazione"}</p>
      }
    </div>
  );
}

export default App;
