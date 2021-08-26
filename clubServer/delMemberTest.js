const fetch = require('node-fetch');

let dummyCorrectData = 'oTn7ecmJJ4yJHiWg';
let dummyWrongData = 'oTn7ecmJJ4yJHi';

let wrongDataAPI =
  'http://localhost:3000/admin/member-management/members/' + dummyCorrectData;
let correctDataAPI =
  'http://localhost:3000/admin/member-management/members/' + dummyWrongData;

fetch('http://localhost:3000/admin/member-management/members')
  .then((res) => res.text())
  .then((text) => console.log('Club Activities:\n' + text));

fetch(correctDataAPI, {
  method: 'delete',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => res.text())
  .then((json) => console.log(json));

fetch(wrongDataAPI, {
  method: 'delete',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => res.text())
  .then((json) => console.log(json));
