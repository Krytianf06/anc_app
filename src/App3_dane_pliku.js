let idToken = "";
let arrIdTakson = [];

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
      return idToken = info;

  }
  
fetchUsers();



setTimeout(() => {
    console.log(idToken);
    fetchHistory(idToken);
}, 3000);

function fetchHistory(idToken) {
    fetch('https://amunatcoll.pl:8000/anc/taxons/search/',
      {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'access-control-allow-credentials': 'true',
          'Authorization': `${idToken}`
        }, body: JSON.stringify({

          "filter": {"typ_kolekcji": "NHC-BOT", "panstwo" : "Polska" },
        
            "pagination": {
            "currentPage": 1,
            "perPage": 10000
            
            
          }
        })
      })
      .then(res => res.json())
      .then((dane) => danePlki1(dane))
  };

function danePlki1(dane) {
    // console.log(dane);
    const arrDane= [];
    // console.log("tu są dane");
    const info1 = dane.items;
    // console.log(info1);
    for (let i = 0; i < info1.length; i++) {
        const item2 = info1[i];
            arrDane.push(item2.kolekcjanumerokazu)
    
    } 
    // console.log(arrDane);
    return arrIdTakson = arrDane;
};

setTimeout(() => {
    console.log(arrIdTakson);
    // console.log("działa tablica");

    for (let i = 0; i < arrIdTakson.length; i++) {
        const item2 = arrIdTakson[i];
                setTimeout(() => {
                    fetchHistoryID(idToken, item2);
                    // console.log("pentla");
                }, 200);
    }

}, 50000);
    

// historia pliku





function fetchHistoryID(idToken, idZmiany) {
    fetch(`https://amunatcoll.pl:8000/anc/taxons/details/${idZmiany}/`,
        {
            mode: 'cors',
            method: 'GET',
            headers: {
        
                'Authorization': `${idToken}`
            }
        })
    
        .then(res => res.json())
        // .then((dane2) => console.log(dane2.dlugoscgeograficzna))
        .then((dane2) => danePlki2(dane2, idZmiany))
};

function danePlki2(dane, idZmiany) {
    
    const pole = dane.dlugoscgeograficzna;
    const pole2 = dane.panstwo;
    // console.log(dane);
    console.log(pole2);
    if (pole === null) {
        console.log("Brak długości takson");
        // console.log(dane);
        // console.log(pole);
        console.log(idZmiany);
        
    }

} 


// else if (pole2 !== "Polska") {
//     console.log("jest znalezione");
//     console.log(idZmiany);
// }
