const fetch = require('node-fetch');

let dummyData = {
  date: '30/10/2020',
  movie: 'Avengers Series',
  description:
    "Marvel's The Avengers (classified under the name Marvel Avengers Assemble in the United Kingdom and Ireland), or simply The Avengers, is a 2012 American superhero film based on the Marvel Comics superhero team of the same name.",
  time: '10 hours',
};

fetch('http://localhost:3000/admin/activity-management/activities', {
  method: 'post',
  body: JSON.stringify(dummyData),
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => res.text())
  .then((json) => console.log(json));
