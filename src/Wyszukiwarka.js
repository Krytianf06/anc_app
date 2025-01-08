let idToken = "";
let arrIdTakson1 = [];
let arrIdTakson2 = [];
let arrIdTakson3 = [];
let arrIdTakson4 = [];
let arrIdTakson5 = [];
let arrIdTakson6 = [];
let arrIdTakson7 = [];
let arrIdTakson8 = [];
let arrIdTakson9 = [];
let arrIdTakson10 = [];

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
    let cuerntPageNumber = 0
    for (let i = 0; i < 10; i++) {
        cuerntPageNumber ++;
        setInterval(() => {
                    fetchHistory(idToken,cuerntPageNumber);
                    console.log("pentla history ID");
                    // console.log(cuerntPageNumber);
                }, 5000);
    }
}, 1000);

function fetchHistory(idToken, page) {
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
        
            'pagination': {
            'currentPage': `${page}`,
            'perPage': 1000
          }
        })
      })
      .then(res => res.json())
        .then((dane) => danePlki1(dane))
        .then((dane) => console.log(dane))
  };

function danePlki1(dane) {
    // console.log(dane);
    const arrDane1 = [];
    const arrDane2 = [];
    const arrDane3 = [];
    const arrDane4 = [];
    const arrDane5 = [];
    const arrDane6 = [];
    const arrDane7 = [];
    const arrDane8 = [];
    const arrDane9 = [];
    const arrDane10 = [];
    // console.log("tu są dane");
    const info1 = dane.items;
    // console.log(info1);
    for (let i = 0; i < info1.length; i++) {
        const item2 = info1[i];
        if (arrDane1.length <= 1000) {
            arrDane1.push(item2.kolekcjanumerokazu)
        } else if (arrDane2.length <= 1000) {
            arrDane2.push(item2.kolekcjanumerokazu)
        } else if (arrDane3.length <= 1000) {
            arrDane3.push(item2.kolekcjanumerokazu)
        } else if (arrDane4.length <= 1000) {
            arrDane.push(item2.kolekcjanumerokazu)
        } else if (arrDane5.length <= 1000) {
            arrDane5.push(item2.kolekcjanumerokazu)
        } else if (arrDane6.length <= 1000) {
            arrDane6.push(item2.kolekcjanumerokazu)
        } else if (arrDane7.length <= 1000) {
            arrDane7.push(item2.kolekcjanumerokazu)
        } else if (arrDane8.length <= 1000) {
            arrDane8.push(item2.kolekcjanumerokazu)
        } else if (arrDane9.length <= 1000) {
            arrDane9.push(item2.kolekcjanumerokazu)
        } else if (arrDane10.length <= 1000) {
            arrDane10.push(item2.kolekcjanumerokazu)
        }
        }

    console.log(arrDane1);
    console.log(arrDane2);
    console.log(arrDane3);
    console.log(arrDane4);
    console.log(arrDane5);
    console.log(arrDane6);
    console.log(arrDane7);
    console.log(arrDane8);
    console.log(arrDane9);
    console.log(arrDane10);

    return arrIdTakson1 = arrDane1;
       
        
        

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