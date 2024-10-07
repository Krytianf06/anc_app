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
    console.log(dane);
    console.log(info);

  }
  
  fetchUsers();



  function fetchHistory() {
    fetch('https://amunatcoll.pl:8000/anc/admin/get_taxon_edit_history/',
      {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'access-control-allow-credentials': 'true',
          'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3MTkxNTM4LCJqdGkiOiIxMDE3NGVjNGFmZWI0Mjk1ODc2ZjgzNmVmZWQ0MWUwMCIsInVzZXJfaWQiOjI5NiwiYWNjZXNzX3RhZ3MiOlsidXNlcl8yOTYiLCJ0ZWFtXzIxNiIsInRlYW1fMjE3IiwidGVhbV8yMjciLCJ0ZWFtXzIxOSIsInRlYW1fMjM0IiwidGVhbV8yNjciLCJ0ZWFtXzI3MCIsImNvb3JkaW5hdG9yIl19.wFat0LKi5eBjSj28dIMBHzQwcEmyQRXfupW2PYMC_0w"
        }, body: JSON.stringify({

          "filter": { "username": "kf63083@amu.edu.pl", "edition_type": "update", "od_daty": "2023-01-10", "do_daty": "2024-09-24" },
        
          "pagination": {
            "perPage": 200000000
            
          }
        })
      })
      .then(res => res.json())
      .then((dane) => danePlki1(dane))
  };

  function danePlki1(dane) {
    console.log(dane);
    const info1 = dane.items;
    console.log(info1);
    for (let i = 0; i < info1.length; i++) {
      const item2 = info1[i];
      console.log(item2.id);
    } 
  };

fetchHistory();


function fetchHistoryID() {
  fetch('https://amunatcoll.pl:8000/anc/admin/get_taxon_edit_details/2229408/',
    {
      mode: 'cors',
      method: 'GET',
      headers: {
        
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3MTkzNjc0LCJqdGkiOiJhMTg4NDU3YzBjNjM0ZGMxYmEwZTQzZjg0MGViNTRiMiIsInVzZXJfaWQiOjI5NiwiYWNjZXNzX3RhZ3MiOlsidXNlcl8yOTYiLCJ0ZWFtXzIxNiIsInRlYW1fMjE3IiwidGVhbV8yMjciLCJ0ZWFtXzIxOSIsInRlYW1fMjM0IiwidGVhbV8yNjciLCJ0ZWFtXzI3MCIsImNvb3JkaW5hdG9yIl19.pY_VcbpRwhalSmSopNcip4nUUE_5BQV9Zvhnaknr1Sk"
      }
      })
    
    .then(res => res.json())
    .then((dane) => danePlki1(dane))
};

  function danePlki1(dane) {
    const pole = dane.items[0].pole;
    if (pole == "lowertaxon.0") {
      console.log("jest takson");
    } else {
      console.log("brak zmiany taksonu")
    }
  console.log(dane.items[0].pole);
  } 


fetchHistoryID();


























  {

    "filter": {"username":"kf63083@amu.edu.pl","edition_type":"update","od_daty":"2024-08-24","do_daty":"2024-09-24"},
    
    "pagination": {
        "totalCount": 2229415,
        "perPage": 200,
        "totalPages": 111471,
        "currentPage": 1
      }
    }




  const handleDataChange = (ev) => {
    fetchUsers()
    console.log("zmiana");
    console.log(ev.target.value);
    setToken(ev.target.value);
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
