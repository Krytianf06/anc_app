import './App.css';
import React, {useState} from "react";

function App() {

  // {useEffect, useState} 
  const [token, setToken] = useState("Podstawa");
  // const [iD, setID] = useState(0);
  // const [userName, setUserName] = useState("login");
  // const [emailID, setEmailID] = useState("email");
  // const [firstName, setFirstName] = useState("Imię");
  // const [lastName, setLastName] = useState("Nazwisko");

  function fetchUsers() {
    fetch('https://amunatcoll.pl:8000/login/',
    {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-control-allow-credentials': 'true',
        }, body: JSON.stringify({
            "username": "kf63083@amu.edu.pl",
            "password": "Krychu11L19*63083"
        })
        })
        .then(res => res.json())
        .then((dane) => danePlki(dane))
  };

 function danePlki(dane) {
    const info = dane.token.access;
   console.log(info)
   setToken(info);
}

;


  const handleDataChange = (ev) => {
    fetchUsers()
    console.log("zmiana");
    console.log(ev.target.value);
    // setToken(ev.target.value);
  }


  return (
    <div className="App">
      <div className="Title">API Amunatcoll</div>

      <input onChange={handleDataChange} type="text" />
      <p>Odpowiedz z serwera: {token}</p>
    </div>
  );
}

export default App;
