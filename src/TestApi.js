    const options = {
    method: 'POST',
    headers: {
      cookie: 'visitor_id=67981AF8434442FA2E71124DE',
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2MzYwNzgxLCJqdGkiOiJjYWU3MGNmNDE3Mjc0ODliYmQxZjA5ZWY1YTY5ODcyMyIsInVzZXJfaWQiOjI5NiwiYWNjZXNzX3RhZ3MiOlsidXNlcl8yOTYiLCJ0ZWFtXzIxNiIsInRlYW1fMjE3IiwidGVhbV8yMjciLCJ0ZWFtXzIxOSIsInRlYW1fMjM0IiwidGVhbV8yNjciLCJjb29yZGluYXRvciJdfQ.SiOZdVYH-l1F1h5E14I0MK_wsHCRz_iRzpKH0nIm26w'
    },
    body: '{"filter":{"username":"Google-110040662813784168414","data_godzina":"2024-06-06"},"pagination":{"perPage":50595}}'
  };
  
  fetch('https://amunatcoll.pl:8000/anc/admin/get_taxon_edit_history/', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));