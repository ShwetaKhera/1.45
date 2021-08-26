const fetch = require('node-fetch');

let dummyCorrectData = '6GSwnS0oNyYKIVAY';
let dummyWrongData = '100';

fetch('http://localhost:3000/user/activity-management/activities')
  .then((res) => res.text())
  .then((text) => console.log('Club Activities:\n' + text));

fetch(
  'http://localhost:3000/admin/activity-management/activities/' +
    dummyCorrectData,
  {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  }
)
  .then((res) => res.text())
  .then((json) => console.log(json));

fetch(
  'http://localhost:3000/admin/activity-management/activities/' +
    dummyWrongData,
  {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  }
)
  .then((res) => res.text())
  .then((json) => console.log(json));
