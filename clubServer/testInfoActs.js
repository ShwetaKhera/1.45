const fetch = require('node-fetch');
// returns a promise that resolves to response object
let myActivitiesPromise = fetch("http://localhost:3000/activities");
let myclubInfoPromise = fetch("http://localhost:3000/info");

myActivitiesPromise.then(res => res.text()).then(text => console.log("Club Activities:\n" + text));


myclubInfoPromise.then(res => res.text()).then(text => console.log("Club Information:\n" + text));

