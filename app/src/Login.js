import "./App.css";
import { useState } from "react";

function App({mostra, setMostra, getInfo}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 

  async function loggaUtente() {
    
    const response = await fetch(`http://localhost:8080/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({"username": username, "password": password}),
    });
    const r =  await response.json();
    getInfo(r.token);
    setMostra(0);
  }

  function cambiaUser(e){
    setUsername(e.target.value);
  }

  function cambiaPass(e){
    setPassword(e.target.value);
  }

  return (
    <div className="form">
      {mostra === 2 ? (
        <>
          <label>Username: </label>
          <input onChange={cambiaUser} type="text" />
          <br/>
          <label>Password: </label>
          <input onChange={cambiaPass} type="text" />
          <br/>
          <button onClick={loggaUtente}>INVIA</button>
          <button onClick={() => setMostra(0)}>ANNULLA</button>
        </>
      ) : (
        <button onClick={() => {setMostra(2)}}>Login</button>
      )}
    </div>
  );
}

export default App;
