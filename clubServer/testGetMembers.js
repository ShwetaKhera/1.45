const fetch = require('node-fetch');

fetch('http://localhost:3000/admin/member-management/members')
  .then((res) => res.text())
  .then((text) => console.log('Club Activities:\n' + text));
