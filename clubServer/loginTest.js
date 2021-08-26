const fetch = require('node-fetch');

let dummyDataCorrect = {
  email: 'tirrivees1820@outlook.com',
  password: '49OqspUq',
};

let dummyDataWrongEmail = {
  email: 'tirriv0@outlook.com',
  password: '49OqspUq',
};

let dummyDataWrongPass = {
  email: 'tirrivees1820@outlook.com',
  password: '49Oqs',
};

fetch('http://localhost:3000/login', {
  method: 'post',
  body: JSON.stringify(dummyDataCorrect),
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => res.json())
  .then((json) => {
    console.log('Trying good login:');
    if (json.error) {
      console.log('After good login status: Unauthorized');
    } else {
      console.log('After good login status: OK');
    }
    console.log(JSON.stringify(json));
  });

fetch('http://localhost:3000/login', {
  method: 'post',
  body: JSON.stringify(dummyDataWrongEmail),
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => res.json())
  .then((json) => {
    console.log('Trying bad email:');
    if (json.error) {
      console.log('After good login status: Unauthorized');
    } else {
      console.log('After good login status: OK');
    }
    console.log(JSON.stringify(json));
  });

fetch('http://localhost:3000/login', {
  method: 'post',
  body: JSON.stringify(dummyDataWrongPass),
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => res.json())
  .then((json) => {
    console.log('Trying bad password:');
    if (json.error) {
      console.log('After good login status: Unauthorized');
    } else {
      console.log('After good login status: OK');
    }
    console.log(JSON.stringify(json));
  });
