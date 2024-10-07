

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
    fetch('https://amunatcoll.pl:8000/anc/admin/get_taxon_edit_history/',
      {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'access-control-allow-credentials': 'true',
          'Authorization': `${idToken}`
        }, body: JSON.stringify({

          "filter": { "username": "kf63083@amu.edu.pl", "edition_type": "update", "od_daty": "2023-01-01", "do_daty": "2024-01-01" },
        
            "pagination": {
            "currentPage": 5,
            "perPage": 1000
            
          }
        })
      })
      .then(res => res.json())
      .then((dane) => danePlki1(dane))
  };

function danePlki1(dane) {
    console.log(dane);
    const arrDane= [];
    console.log("tu są dane");
    const info1 = dane.items;
    // console.log(info1);
    for (let i = 0; i < info1.length; i++) {
        const item2 = info1[i];
            arrDane.push(item2.id)
    
    } 
    console.log(arrDane);
    return arrIdTakson = arrDane;
};


setTimeout(() => {
    console.log(arrIdTakson);
    console.log("działa tablica");
}, 5000);
    


// historia pliku



    





    for (let i = 0; i < arrIdTakson.length; i++) {
        const item2 = arrIdTakson[i];
            setTimeout(() => {
                fetchHistoryID(idToken, item2)
            }, 200);
    }






function fetchHistoryID(idToken, idZmiany) {
  fetch(`https://amunatcoll.pl:8000/anc/admin/get_taxon_edit_details/${idZmiany}/`,
    {
      mode: 'cors',
      method: 'GET',
      headers: {
        
        'Authorization': `${idToken}`
      }
      })
    
    .then(res => res.json())
    .then((dane2) => danePlki2(dane2, idZmiany))
};

function danePlki2(dane, idZmiany) {
    
    const pole = dane.items[0].pole;
    if (pole === "lowertaxon.0") {
        console.log("jest takson");
        console.log(dane);
        console.log(pole);
        console.log(idZmiany);
    } else {
        console.log("brak")
      }
} 
  



console.log(dane.items[0].pole);

else {
      console.log("brak zmiany taksonu")
    }